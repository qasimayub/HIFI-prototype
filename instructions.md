# Building Mini-Games for Enviromon: Developer Guide

This document serves as a comprehensive guide for creating new mini-games within the Enviromon prototype. It outlines the core philosophy, architectural constraints, UI consistencies, and step-by-step implementation practices learned during the development of previous games (like Smog Buster).

## 1. Core Philosophy & Intent

### Environmental Education First
Every game in Enviromon MUST serve a distinct environmental purpose. The mechanics of the game should mirror the real-world problem or solution:
*   **Smog Buster:** Whack-a-mole mechanics to stop toxic emissions.
*   **Factory Leak:** Pipe-routing mechanics to seal toxic effluent.
*   **Landfill Sort:** Drag-and-drop mechanics to properly categorize waste.

When designing a new game, start with the environmental problem (e.g., deforestation, oil spills, plastic in oceans) and find a classic arcade mechanic that fits.

### Educational Intro Screens
Games should not instantly throw the player into action. Always include an **Intro Screen** that pauses the game to explain:
1. What the environmental issue is.
2. Why it is harmful (e.g., "Breathing polluted air causes asthma!").
3. The gameplay rules and controls.

---

## 2. Global Architecture & The Mission Registry

### Map Positioning
The game world is a `1600x1200` rendered canvas. Missions are registered via the `MISSIONS` array in `index.html`.

**⚠️ CRITICAL NOTE ON POSITIONING:** Changing `tx` and `ty` in the `MISSIONS` array *only* moves the clickable mission pin. The actual environment art (like the factory, cabin, or lighthouse) is hardcoded on the background canvas. If you want to visually reposition a game, you must update **both** the `tx`/`ty` in the array AND the corresponding drawing coordinates inside the `buildWorld()` function (e.g., `factory(1068,300)`).

To add a new game, append an object to `MISSIONS`:
```javascript
{
  id: 'my_new_game',
  title: 'GAME TITLE',
  desc: 'Short description\nof the mission.',
  icon: '🌍', // Emoji icon
  tx: 1040, // X coordinate on the map
  ty: 250,  // Y coordinate on the map
  tw: 80,   // Clickable width
  th: 80,   // Clickable height
  type: 'custom', 
  coins: 90, // Max coins awarded
  xp: 150,   // Max XP awarded
  color: '#888888' // Accent color for map pin/UI
}
```

### Map vs. DOM Overlays
While the main world is rendered on an HTML5 `<canvas>`, **mini-games are built purely using DOM elements (HTML/CSS overlays).** This allows for easier responsive design, text rendering, and CSS animations.

---

## 3. UI Consistency & Overlay Structure

### The Overlay Container
Your game must live in a dedicated, full-screen overlay `div`. It should be hidden by default (`display: none;`).

```html
<!-- Example Game Overlay -->
<div id="newgame-ov" style="position: fixed; inset: 0; z-index: 200; overflow: hidden; display: none;">
  <!-- Game contents go here -->
</div>
```

### The Back Button
Every game MUST have a consistent back button in the top left corner.
```html
<div id="newgame-back" onclick="closeNewGame(false)" style="position: absolute; top: 15px; left: 15px; width: 56px; height: 56px; background: #fff9e6; border-radius: 50%; box-shadow: 0 4px 8px rgba(0,0,0,.2); display: flex; align-items: center; justify-content: center; cursor: pointer; border: 2px solid #5a3e1b; z-index: 205; transition: transform .2s;">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5a3e1b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
</div>
```

### The Dynamic HUD
Every game must include the capsule-style HUD in the top right to show real-time Coins and XP.
**CRITICAL:** The XP display must show `+N XP` (e.g., `+10 XP`). **Do not use "Level +N".**

```html
<div id="newgame-hud" style="position: absolute; top: 15px; right: 15px; display: flex; gap: 15px; z-index: 205; pointer-events: none;">
  <!-- XP Pill -->
  <div class="stat-pill xp" style="min-width:180px; height:42px">
    <div class="progress-fill" style="width:100%;background:#00bfff"></div>
    <img src="star.svg" alt="star" style="width:28px;height:28px">
    <div class="value" id="newgame-hr">+0 XP</div>
  </div>
  <!-- Coin Pill -->
  <div class="stat-pill coin" style="min-width:180px; height:42px">
    <div class="progress-fill" style="width:100%;background:#ffd700"></div>
    <img src="coin.svg" alt="coin" style="width:28px;height:28px">
    <div class="value" id="newgame-hc">+0</div>
  </div>
</div>
```

---

## 4. Game Logic & State Management

### 1. Hiding the World UI
When a game starts, you must hide the main world UI components and display your overlay:
```javascript
document.getElementById('mdo').classList.add('h'); // Hide Mission Detail Overlay
document.getElementById('menu').classList.add('h'); // Hide Side Menu
document.getElementById('hud').classList.add('h'); // Hide Global HUD
document.getElementById('joystick').classList.add('h'); // Hide Mobile Joystick

document.getElementById('newgame-ov').style.display = 'block'; // Show your game
```

### 2. Intro, Success, and Failure Screens
Use the existing `.fc-dialog` and `.dg-card` CSS classes to style your modals consistently. 

**Intro Example:**
```html
<div id="newgame-intro" style="position: absolute; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.8);">
  <div class="fc-dialog" style="padding:30px; border:4px solid #3d2314; background:#fdf4da; text-align:center;">
    <div class="lg-title" style="color:#e82020;">ISSUE ALERT!</div>
    <div class="sm-text">Educational text here...</div>
    <button class="fc-btn" onclick="startNewGameLoop()">&#9654; START</button>
  </div>
</div>
```

### 3. Dynamic Scoring & Penalties
Do not hardcode HUD values at the start. Build variables to track live progress:
*   `score`: Increases on success. Updates the Coin text (`#newgame-hc`).
*   `xp`: Often scales with score (e.g., `Math.floor(score / 2)`). Updates the XP text (`#newgame-hr`).
*   `misses`: Track failures. If `misses >= maxMisses`, trigger the Failure state.

### 4. Difficulty Scaling (The "Smog Buster" Method)
Arcade games should start slow and get progressively harder. **Do not use abrupt thresholds.** Use linear interpolation based on progress.

```javascript
let progress = Math.min(1, currentScore / targetScore);

// Example: Spawn rate decreases linearly from 800ms to 450ms
let spawnRate = 800 - (progress * 350); 

// Example: Speed multiplier increases linearly from 1.2x to 2.5x
let speedMult = 1.2 + (progress * 1.3);
```

### 5. Memory Management (Critical)
Always clear your `setInterval` and `setTimeout` loops when the game ends or resets. Store them in an array:
```javascript
let myIntervals = [];

// Usage
myIntervals.push(setTimeout(myFunc, 1000));

// Cleanup on close
myIntervals.forEach(clearTimeout);
myIntervals = [];
```

### 6. Closing the Game
When the game ends (Win, Lose, or Back Button), you must call the global `closeM` function to award the points, hide your overlay, and restore the world UI.

```javascript
function closeNewGame(success) {
  myActiveState = false;
  myIntervals.forEach(clearTimeout);
  myIntervals = [];
  
  document.getElementById('newgame-ov').style.display = 'none';
  
  // Award coins and XP only on success
  closeM(success ? finalCoins : 0, success ? finalXP : 0, success);
  
  // Restore World UI
  document.getElementById('menu').classList.remove('h');
  document.getElementById('joystick').classList.remove('h');
  document.getElementById('hud').classList.remove('h');
}
```

---

## 5. Summary Checklist for a New Game
1. [ ] Define the environmental problem and educational takeaway.
2. [ ] Add mission configuration to `MISSIONS` array in `index.html`.
3. [ ] Build the HTML `<div id="yourgame-ov">` overlay.
4. [ ] Include the consistent Back button and Dynamic `+X XP` / Coins HUD.
5. [ ] Create an Educational Intro modal with a Start button.
6. [ ] Build Win (`#yourgame-success`) and Lose (`#yourgame-fail`) modals.
7. [ ] Implement the `startGame`, `startGameLoop`, and `closeGame` JavaScript functions.
8. [ ] Ensure mechanics scale linearly in difficulty.
9. [ ] Ensure all loops/timers are tracked and cleared on exit.