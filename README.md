# JavaScript Space Invaders

A modern, browser-based recreation of the classic arcade game **Space Invaders**, built entirely with vanilla JavaScript, HTML5 Canvas, and minimal external libraries. The player controls a spaceship to defend against waves of descending invaders, utilizing precise movement, projectile firing, power-ups, explosive bombs, and dynamic audio-visual feedback.

This project serves as a comprehensive demonstration of:
- Game loop management with fixed timestep (`requestAnimationFrame` + performance timing)
- Object-oriented design using ES6 classes and modular file structure
- 2D rendering and transformations on Canvas (rotation, particles, explosions)
- Collision detection (rectangular and circular)
- Procedural enemy wave generation with increasing difficulty
- Audio integration (Howler.js) and animation (GSAP)
- Responsive UI with start, score, and game-over screens

Live Demo:  
https://lloydcode597.github.io/JavaScript-Space-Invaders-Game/

## Features

- Smooth player movement with tilt animation (A/D or Arrow keys)
- Single-shot and rapid-fire (MachineGun power-up) projectiles
- Procedurally generated invader grids with side-to-side movement and descent
- Invader counter-fire and player-damaging projectiles
- Drifting power-ups that grant temporary rapid fire
- Bouncing bombs with expanding GSAP-animated explosions
- Particle effects for thrust, explosions, and background starfield
- Dynamic floating score labels on enemy destruction
- Sound effects and background music (laser, explosion, bonus, game over)
- Start screen, score display, and animated game-over/restart interface
- Fixed 60 FPS gameplay loop with delta-time awareness

## Technologies

- HTML5 / CSS3
- Vanilla JavaScript (ES6+)
- HTML5 Canvas API
- GSAP (GreenSock Animation Platform) for smooth animations
- Howler.js for cross-browser audio management
- Modular class-based architecture (`js/classes/`)

No build tools or frameworks are used — the project runs directly in modern browsers.

## Installation & Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/lloydcode597/JavaScript-Space-Invaders-Game.git
   cd JavaScript-Space-Invaders-Game
