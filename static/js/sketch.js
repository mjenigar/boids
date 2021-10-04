const flock = [];

function setup() {
  // createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  createCanvas(920, 600, WEBGL);

  flock.push(new Boid());

}

function draw() {
  background(0);
  //drag to move the world.
  orbitControl();

  for(let boid of flock){
    boid.update();
    boid.show();
  }

  // translate(-240 * 2, 200, 0);
  // push();
  // rotateZ(frameCount * 0.01);
  // rotateX(frameCount * 0.01);
  // rotateY(frameCount * 0.01);
  // cone(70, 70);
  // pop();
}
