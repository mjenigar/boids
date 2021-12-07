let CONFIG = {
  "x_angle" : 0.0,
  "y_angle" : 0.0,
  "zoom": 1
}

function setup() {
  this.canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  this.yAngle = 0;
  this.xAngle = 0;
  this.zoom = 1;

  this.yPressed = 0;
  this.xPressed = 0;

  this.L = createVector(1000., 1000., 1000.);
  boid = new Boid();
}

function draw() {
  background("#000000");

  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;

  ambientLight(60, 60, 60);
  pointLight(255, 255, 255, locX, locY, 100);

  scale(CONFIG.zoom);
  rotateY(CONFIG.y_angle);
  rotateX(CONFIG.x_angle);

  boid.update();
  boid.show();
}

function mouseWheel(e){
  CONFIG.zoom -= e.delta*0.0001;
  console.log(CONFIG.zoom);
}


function mouseDragged() {
  yAngleTemp = atan( (mouseX - xPressed)*0.0001 );
  xAngleTemp = atan( (yPressed - mouseY)*0.0001 );

  yAngle += yAngleTemp;
  xAngle += xAngleTemp;

  //yAngle = map(yAngle, -HALF_PI, HALF_PI, -PI, PI);
  //xAngle = map(xAngle, -HALF_PI, HALF_PI, -PI, PI);
}

function mousePressed() {
	yPressed = mouseY;
	xPressed = mouseX;
}

