WORLD_W = 25;
WORLD_H = 25;
N_BOIDS = 3;
FLOCK = [];

UPDATE_INTERVAL = 5000;
UPDATE = undefined;
WORLD = GenerateWorld(WORLD_W, WORLD_H);

window.addEventListener('DOMContentLoaded', () => { Main();})

function Main(){
    GenerateWorld(WORLD_W, WORLD_H);
    for(i = 0; i < N_BOIDS; i++){
        FLOCK.push(new Boid());
    }

    UPDATE = window.setInterval(function(){ 
        console.clear();
        for(var i = 0; i < N_BOIDS; i++){
            FLOCK[i].FixEdges();
            FLOCK[i].ApplyRules(FLOCK);
            FLOCK[i].Update();
            FLOCK[i].Move();
        }
        DrawWorld();
    }, UPDATE_INTERVAL);
}

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GenerateWorld(w,h){
    var world = [];

    for(var i = 0; i < w; i++){
        row = [];
        for(var j = 0; j < h; j++){
            row.push("   ");
        }
        world.push(row);
    }

    return world;
}

function DrawWorld(){
    var world_str = "";
    for(var i = 0; i < WORLD_W; i++){
        world_str += "| ";
        for(var j = 0; j < WORLD_H; j++){
            world_str += WORLD[i][j];
        }
        world_str += "|\n";
    }

    console.log(world_str);
}


class Boid {
    constructor(){
        this.char = " o ";
        this.position = [randomNumber(0, WORLD_W-1), randomNumber(0, WORLD_H-11)];
        this.velocity = [randomNumber((WORLD_W*-1), WORLD_W), randomNumber((WORLD_W*-1), WORLD_W)]
        this.velocity = [1,1]
        this.acceleration = [0,0];
        this.maxForce = 1;
        this.maxSpeed = 4;
        this.perception = 10;

        WORLD[this.position[0]][this.position[1]] = this.char;
    }

    FixEdges() {
        if (this.position[0] > WORLD_W - 1) {
            this.position[0] = 0;
        } else if (this.position[0] < 0) {
            this.position[0] = WORLD_W - 1;
        }
        if (this.position[1] > WORLD_H - 1) {
            this.position[1] = 0;
        } else if (this.position[1] < 0) {
            this.position[1] = WORLD_H - 1;
        }
    }

    Move(){
        WORLD[this.position[0]][this.position[1]] = "   ";
        this.position = AddVectors(this.position, this.velocity);
        this.velocity = AddVectors(this.position, this.acceleration);
        WORLD[this.position[0]][this.position[1]] = this.char;

        // console.log("x: " + this.position[0] + " y: " + this.position[1]);
    }

    Align(boids) {
        var steering = [0, 0]
        var boidCounter = 0;
        for (var other of boids) {
            var dist = EucDistance(this.position, other.position)
            if (other != this && dist < this.perception) {
                steering = AddVectors(other.velocity, steering);
                boidCounter++;
            }
        }
        if (boidCounter > 0) {
            steering = DivideByScalar(steering, boidCounter);
            steering = SubtractVectors(steering, this.velocity);
            steering = LimitVector(steering, this.maxForce);
        }
        return steering;
    }

    Cohesion(boids) {
        var steering = [0, 0]
        var boidCounter = 0;
        for (let other of boids) {
            var dist = EucDistance(this.position, other.position)
            if (other != this && dist < this.perception) {
                steering = AddVectors(other.position, steering);
                boidCounter++;
            }
        }
        if (boidCounter > 0) {
            steering = DivideByScalar(steering, boidCounter);
            steering = SubtractVectors(steering, this.position);
            steering = LimitVector(steering, this.maxForce);
        }
        return steering;
    }


    Separation(boids) {
        var steering = [0, 0]
        var boidCounter = 0;
        for (let other of boids) {
            var dist = EucDistance(this.position, other.position)
            if (other != this && dist < this.perception) {
                var diff = SubtractVectors(this.position, other.position)
                diff = DivideByScalar(diff, dist*dist)
                steering = AddVectors(diff, steering);
                boidCounter++;
            }
        }
        if (boidCounter > 0) {
            steering = DivideByScalar(steering, boidCounter);
            steering = SubtractVectors(steering, this.velocity);
        }
        return steering;
    }


    ApplyRules(boids){
        var align_force = this.Align(boids);
        var cohesion_force = this.Cohesion(boids);
        var separation_force = this.Separation(boids);
        
        this.acceleration = AddVectors(this.acceleration, align_force);
        this.acceleration = AddVectors(this.acceleration, separation_force);
        this.acceleration = AddVectors(this.acceleration, cohesion_force);
    }

    Update() {
        this.position = AddVectors(this.position, this.velocity);
        this.velocity = AddVectors(this.velocity, this.acceleration);
        this.velocity = LimitVector(this.velocity, this.maxSpeed);
        this.acceleration = [0,0];

        console.log(this.position);
        console.log(this.velocity);
        console.log("\n\n")
        
    }

}



