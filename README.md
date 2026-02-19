# Space Invaders - Browser Game

A modern recreation of the classic arcade game **Space Invaders** built entirely with **vanilla JavaScript** and **HTML5 Canvas**. Defend Earth from waves of descending alien invaders by maneuvering your spaceship, firing lasers, and surviving their counterattacks.

This project demonstrates core game development concepts including:
- Game loop with `requestAnimationFrame`
- Object-oriented design (classes for Player, Invaders, Projectiles, Particles, Grid)
- Collision detection
- Particle effects for explosions
- Dynamic enemy waves with random spawning and shooting
- Score tracking and game-over states
- Smooth animations (player tilt, fading particles, background stars)


## ✨ Features

- **Player Controls**  
  - Move: `A` / `D` or Left/Right Arrow keys  
  - Shoot: `Spacebar`  
  - Ship tilts slightly when moving for visual feedback

- **Enemies**  
  - Procedurally generated grids of invaders (random rows/columns per wave)  
  - Side-to-side movement with downward drop on edge hit  
  - Random shooting toward the player

- **Game Mechanics**  
  - Player & invader projectiles  
  - Accurate bounding-box collision detection  
  - Explosion particles on hits  
  - Starfield background for immersion  
  - Score system (100 points per invader destroyed)  
  - Game over on player hit (with fade-out effect)

- **Visual & Audio Polish** (current / planned)  
  - Sprite-based player and invaders  
  - Fading particles for destruction  
  - (Future: sound effects for lasers/explosions via Web Audio API)

## 🛠️ Technologies Used

- HTML5  
- CSS (minimal styling for centering & score)  
- Vanilla JavaScript (ES6+)  
- HTML5 Canvas API (rendering, transformations, particles)  
- No external libraries or frameworks — pure browser-native code

## 🔧 Installation & Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/LloydCode597/JavaScript-Space-Invaders-Game.git
   cd space-invaders
