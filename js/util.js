function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
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
