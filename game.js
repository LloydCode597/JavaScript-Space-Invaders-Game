const scoreEl = document.querySelector("#score");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// set canvas size
canvas.width = 1024;
canvas.height = 680;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

let player = new Player();
let projectiles = [];
let grids = [];
let invaderProjectiles = [];
let particles = [];
let bombs = [];
let powerUps = [];

let keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
};

let frames = 0;
let randomInterval = Math.floor(Math.random() * 500 + 500);
let game = {
  over: false,
  active: true,
};

let score = 0;

function init() {
  player = new Player();
  projectiles = [];
  grids = [];
  invaderProjectiles = [];
  particles = [];
  bombs = [];
  powerUps = [];

  keys = {
    a: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
    space: {
      pressed: false,
    },
  };

  frames = 0;
  randomInterval = Math.floor(Math.random() * 500 + 500);
  game = {
    over: false,
    active: true,
  };

  score = 0;

  for (let i = 0; i < 100; i++) {
    particles.push(
      new Particle({
        position: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        },
        velocity: {
          x: 0,
          y: 0.3,
        },
        radius: Math.random() * 2,
        color: "white",
        fades: false,
      }),
    );
  }
}

function createParticles({ object, color, fades }) {
  for (let i = 0; i < 15; i++) {
    particles.push(
      new Particle({
        position: {
          x: object.position.x + object.width / 2,
          y: object.position.y + object.height / 2,
        },
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
        radius: Math.random() * 3 + 1,
        color: color || "#BAA0DE",
        fades: true,
      }),
    );
  }
}

function createScoreLabel({ object, score = 100 }) {
  const scoreLabel = document.createElement("label");
  scoreLabel.innerHTML = `+${score}`;
  scoreLabel.style.position = "absolute";
  scoreLabel.style.color = "white";
  scoreLabel.style.left = `${object.position.x}px`;
  scoreLabel.style.top = `${object.position.y}px`;
  scoreLabel.style.userSelect = "none";
  document.getElementById("parentDiv").appendChild(scoreLabel);

  gsap.to(scoreLabel, {
    y: -30,
    opacity: 0,
    duration: 1,
    ease: "easeOut",
    onComplete: () => {
      document.getElementById("parentDiv").removeChild(scoreLabel);
    },
  });
}

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width
  );
}

function endGame() {
  // Make player disappear and stop game
  audio.gameOver.play();
  setTimeout(() => {
    player.opacity = 0;
    game.over = true;
  }, 0);

  // stop game and show restart screen after 2 seconds
  setTimeout(() => {
    game.active = false;
    document.querySelector("#restartScreen").style.display = "flex";
  }, 2000);

  createParticles({
    object: player,
    color: "white",
    fades: true,
  });
}

let spawnBuffer = 500;
let fps = 60;
let fpsInterval = 1000 / fps;
let msPrevious = window.performance.now();
function animate() {
  if (!game.active) return;
  requestAnimationFrame(animate);

  const msCurrent = window.performance.now();
  const elapsed = msCurrent - msPrevious;

  if (elapsed < fpsInterval) return;

  msPrevious = msCurrent - (elapsed % fpsInterval);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = powerUps.length - 1; i >= 0; i--) {
    const powerUp = powerUps[i];
    if (powerUp.position.x - powerUp.radius >= canvas.width) {
      powerUps.splice(i, 1);
    } else {
      powerUp.update();
    }
  }

  // spawn powerUps
  if (frames % 500 === 0) {
    powerUps.push(
      new PowerUp({
        position: {
          x: 0,
          y: Math.random() * 300 + 15,
        },
        velocity: {
          x: 5,
          y: 0,
        },
      }),
    );
  }

  // spawn bombs
  if (frames % 200 === 0 && bombs.length < 3) {
    bombs.push(
      new Bomb({
        position: {
          x: randomBetween(Bomb.radius, canvas.width - Bomb.radius),
          y: randomBetween(Bomb.radius, canvas.height - Bomb.radius),
        },
        velocity: {
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 6,
        },
      }),
    );
  }

  for (let i = bombs.length - 1; i >= 0; i--) {
    const bomb = bombs[i];
    if (bomb.opacity <= 0) {
      setTimeout(() => {
        bombs.splice(i, 1);
      }, 0);
    } else {
      bomb.update();
    }
    bomb.update();
  }

  player.update();

  for (let i = player.particles.length - 1; i >= 0; i--) {
    const particle = player.particles[i];
    if (particle.opacity === 0) {
      setTimeout(() => {
        player.particles.splice(i, 1);
      }, 0);
    } else {
      particle.update();
    }
  }

  particles.forEach((particle, index) => {
    if (particle.position.y - particle.radius >= canvas.height) {
      particle.position.x = Math.random() * canvas.width;
      particle.position.y = -particle.radius;
    }

    if (particle.opacity <= 0) {
      setTimeout(() => {
        particles.splice(index, 1);
      }, 0);
    } else {
      particle.update();
    }
  });

  invaderProjectiles.forEach((invaderProjectile, index) => {
    if (
      invaderProjectile.position.y + invaderProjectile.height >=
      canvas.height
    ) {
      setTimeout(() => {
        invaderProjectiles.splice(index, 1);
      }, 0);
    } else {
      invaderProjectile.update();
    }
    // projectile hits player
    if (
      rectangularCollision({
        rectangle1: invaderProjectile,
        rectangle2: player,
      })
    ) {
      invaderProjectiles.splice(index, 1);
      endGame();
    }
  });

  for (let i = projectiles.length - 1; i >= 0; i--) {
    const projectile = projectiles[i];

    for (let j = bombs.length - 1; j >= 0; j--) {
      const bomb = bombs[j];

      // if projectile hits bomb, remove projectile
      if (
        Math.hypot(
          projectile.position.x - bomb.position.x,
          projectile.position.y - bomb.position.y,
        ) <
          projectile.radius + bomb.radius &&
        !bomb.active
      ) {
        projectiles.splice(i, 1);
        bomb.explode();
      }
    }

    for (let j = powerUps.length - 1; j >= 0; j--) {
      const powerUp = powerUps[j];

      // if projectile hits powerUp, remove projectile and powerUp
      if (
        Math.hypot(
          projectile.position.x - powerUp.position.x,
          projectile.position.y - powerUp.position.y,
        ) <
        projectile.radius + powerUp.radius
      ) {
        projectiles.splice(i, 1);
        powerUps.splice(j, 1);
        player.powerUp = "MachineGun";
        audio.bonus.play();

        setTimeout(() => {
          player.powerUp = null;
        }, 5000);
      }
    }

    if (projectile.position.y + projectile.radius <= 0) {
      projectiles.splice(i, 1);
    } else {
      projectile.update();
    }
  }

  grids.forEach((grid, gridIndex) => {
    grid.update();

    // spawn projectiles from invaders
    if (frames % 100 === 0 && grid.invaders.length > 0) {
      const randomInvaderIndex = Math.floor(
        Math.random() * grid.invaders.length,
      );
      grid.invaders[randomInvaderIndex].shoot(invaderProjectiles);
    }

    for (let index = grid.invaders.length - 1; index >= 0; index--) {
      const invader = grid.invaders[index];

      invader.update({ velocity: grid.velocity });

      for (let j = bombs.length - 1; j >= 0; j--) {
        const bomb = bombs[j];

        const invaderRadius = 15;

        // if bomb hits bomb, remove invader
        if (
          Math.hypot(
            invader.position.x - bomb.position.x,
            invader.position.y - bomb.position.y,
          ) <
            invaderRadius + bomb.radius &&
          bomb.active
        ) {
          score += 50;
          scoreEl.innerHTML = score;
          grid.invaders.splice(index, 1);
          createScoreLabel({ object: invader, score: 50 });

          createParticles({ object: invader, fades: true });
        }
      }

      // projectiles hit invaders
      projectiles.forEach((projectile, projectileIndex) => {
        if (
          projectile.position.y - projectile.radius <=
            invader.position.y + invader.height &&
          projectile.position.x + projectile.radius >= invader.position.x &&
          projectile.position.x - projectile.radius <=
            invader.position.x + invader.width &&
          projectile.position.y + projectile.radius >= invader.position.y
        ) {
          setTimeout(() => {
            const invaderFound = grid.invaders.find((invader2) => {
              return invader2 === invader;
            });
            const projectileFound = projectiles.find((projectile2) => {
              return projectile2 === projectile;
            });

            // remove invader and projectile
            if (invaderFound && projectileFound) {
              score += 100;

              scoreEl.innerHTML = score;

              // dynamic score labels
              createScoreLabel({ object: invader });

              createParticles({ object: invader, fades: true });

              // play explosion sound when singular projectile hits invader
              audio.explode.play();
              grid.invaders.splice(index, 1);
              projectiles.splice(projectileIndex, 1);

              if (grid.invaders.length > 0) {
                const firstInvader = grid.invaders[0];
                const lastInvader = grid.invaders[grid.invaders.length - 1];
                grid.width =
                  lastInvader.position.x -
                  firstInvader.position.x +
                  lastInvader.width;
                grid.position.x = firstInvader.position.x;
              } else {
                grids.splice(gridIndex, 1);
              }
            }
          }, 0);
        }
      });
      // remove player if invader reaches bottom of screen
      if (
        rectangularCollision({
          rectangle1: invader,
          rectangle2: player,
        }) &&
        !game.over
      )
        endGame();
    } // end of invaders loop over grid.invaders
  });

  if (keys.a.pressed && player.position.x >= 0) {
    player.velocity.x = -7;
    player.rotation = -0.15;
  } else if (
    keys.d.pressed &&
    player.position.x + player.width <= canvas.width
  ) {
    player.velocity.x = 7;
    player.rotation = 0.15;
  } else {
    player.velocity.x = 0;
    player.rotation = 0;
  }

  // spawn enemies
  if (frames % randomInterval === 0) {
    console.log(spawnBuffer);
    console.log(randomInterval);
    spawnBuffer = spawnBuffer < 0 ? 100 : spawnBuffer;
    grids.push(new Grid());
    randomInterval = Math.floor(Math.random() * 500 + spawnBuffer);
    frames = 0;
    spawnBuffer -= 100;
  }

  if (
    keys.space.pressed &&
    player.powerUp === "MachineGun" &&
    frames % 2 === 0
  ) {
    if (frames % 6 === 0) audio.shoot.play();
    projectiles.push(
      new Projectile({
        position: {
          x: player.position.x + player.width / 2,
          y: player.position.y,
        },
        velocity: {
          x: 0,
          y: -10,
        },
        color: "cyan",
      }),
    );
  }

  frames++;
}
document.querySelector("#startButton").addEventListener("click", () => {
  audio.backgroundMusic.play();
  audio.start.play();
  document.querySelector("#startScreen").style.display = "none";
  document.querySelector("#scoreContainer").style.display = "block";
  init();
  animate();
});

document.querySelector("#restartButton").addEventListener("click", () => {
  audio.select.play();
  document.querySelector("#restartScreen").style.display = "none";
  init();
  animate();
});

addEventListener("keydown", ({ key }) => {
  if (game.over) return;

  switch (key) {
    case "a":
    case "ArrowLeft":
      keys.a.pressed = true;
      break;
    case "d":
    case "ArrowRight":
      keys.d.pressed = true;
      break;
    case " ":
      keys.space.pressed = true;
      if (player.powerUp === "MachineGun") return;

      audio.shoot.play();
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y,
          },
          velocity: {
            x: 0,
            y: -10,
          },
        }),
      );
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
    case "ArrowLeft":
      keys.a.pressed = false;
      break;
    case "d":
    case "ArrowRight":
      keys.d.pressed = false;
      break;
    case " ":
      keys.space.pressed = false;
      break;
  }
});
