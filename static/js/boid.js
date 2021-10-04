class Boid {
    constructor() {
        this.position = createVector(width/2, height/2)
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector();
    }


    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }

    show() {
        translate(-240 * 2, 200, 0);
        push();
        // rotateZ(frameCount * 0.01);
        // rotateX(frameCount * 0.01);
        // rotateY(frameCount * 0.01);
        cone(70, 70);
        pop();
    }
    

}