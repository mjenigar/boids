class Boid {
    constructor() {
        this.boid_radius = 40;
        this.boid_height = 100;
        this.detail_x = 50;
        this.detail_y = 16;
        this.color = "#4d13b5";

        this.position = createVector(-5, 0, 0); //TODO RANDOM
        this.velocity = p5.Vector.random3D();

        this.Spawn();
    }

    Spawn() {
        fill(this.color);
        translate(this.position.x, this.position.y, this.position.z);
        return cone(this.boid_radius, this.boid_height, this.detail_x, this.detail_y, true);
    }

    update() {
        this.position.add(this.velocity);
        // this.HandleEdges();
        // this.velocity.add(this.acceleration);
        // this.velocity.limit(this.maxSpeed);
        // this.acceleration.mult(0);
        console.log(this.position);
    }

    show() {
        push();
        translate(this.position);
        pop();
    }

    HandleEdges() {
        if (this.position.x > 1000)
            this.position.x = 0;
        if (this.position.x < 0)
            this.position.x = 1000;
        if (this.position.y > 1000)
            this.position.y = 0;
        if (this.position.y < 0)
            this.position.y = 1000;
        if (this.position.z > 1000)
            this.position.z = 0;
        if (this.position.z < 0)
            this.position.z = 1000;
    }
}