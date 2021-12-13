let pslider, fslider, sslider;
let pslider_label;

const flock = [];


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    for (let i = 0; i < 100; i++) {
        flock.push(new Boid());
    }

    pslider = createSlider(0, 200, 50);
    pslider.position(30, window.innerHeight-70);
    fslider = createSlider(0, 200, 20);
    fslider.position(330, window.innerHeight-70);
    sslider = createSlider(0, 10, 4);
    sslider.position(630, window.innerHeight-70);


    pslider_label = createP('Perception');
    pslider_label.position(pslider.width / 2 - 30, window.innerHeight-40);
    pslider_label.style('color: white; font-family: sans-serif;');

    fslider_label = createP('Force');
    fslider_label.position(pslider.width/2 + 300, window.innerHeight-40);
    fslider_label.style('color: white; font-family: sans-serif;');

    sslider_label = createP('Speed');
    sslider_label.position(pslider.width/2 + 600, window.innerHeight-40);
    sslider_label.style('color: white; font-family: sans-serif;');


    for (let boid of flock) {
        boid.perceptionRadius = pslider.value();
        boid.maxForce = fslider.value() / 100;
        boid.maxSpeed = sslider.value();
    }
    pslider.changed(() => {
        for (let boid of flock) {
            boid.perceptionRadius = pslider.value();
        }
    });
    fslider.changed(() => {
        for (let boid of flock) {
            boid.maxForce = fslider.value() / 100;
        }
    });
    sslider.changed(() => {
        for (let boid of flock) {
            boid.maxSpeed = sslider.value();
        }
    });
}

function draw() {
    background(0);

    for (let boid of flock) {
        boid.show();
        boid.edges();
        boid.update();
        boid.flock(flock);
    }

    fill(255, 0, 0, 200);
    strokeWeight(0);
    textSize(24);
    textAlign(CENTER)
    text(pslider.value(), pslider.width / 2 + 30, window.innerHeight-80);
    text(fslider.value() / 100, fslider.width / 2 + 330, window.innerHeight-80);
    text(sslider.value(), sslider.width / 2 + 630, window.innerHeight-80);
}