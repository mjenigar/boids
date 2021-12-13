class Boid {
    constructor(world_size) {
        // Boid 3d object parameters
        this.radius = 1;
        this.height = 2;
        this.color = "#4d13b5";
        this.radial_segments = 30;
        this.height_segments = 30;
        
        this.world_size = world_size;
        this.max_speed = 0.5;
        this.max_force = 0.003;

        this.alignment_factor = 1.3;
        this.cohesion_factor = 0.6;
        this.separation_factor = 0.8;

        this.alignment_distance = 15;
        this.cohesion_distance = 25;
        this.separation_distance = 10;
        this.center_factor = 0.3;
        
        this.position = this.GetRandomPosition();
        this.rotation = new Vector(0, 0, 0);
        this.velocity = new Vector(Math.random()*this.max_speed, Math.random()*this.max_speed, Math.random()*this.max_speed);
        this.euler_angles = new THREE.Euler(this.rotation.x, this.rotation.y, this.rotation.z);
        this.acceleration = new Vector(0, 0, 0);

        this.vfrom = new THREE.Vector3(0, 1, 0);
    }

    Update(flock){
        var align_force = this.Alignment(flock);
        var coh_force = this.Cohesion(flock);
        var sep_force = this.Separation(flock);

        coh_force.mulScalar(this.cohesion_factor);
        sep_force.mulScalar(this.separation_factor);
        align_force.mulScalar(this.alignment_factor);        

        this.acceleration.add(sep_force);
        this.acceleration.add(coh_force);
        this.acceleration.add(align_force);

        var center = new Vector(0,0,0);
        var center_force = this.Seek(center);
        center_force.mulScalar(this.center_factor);
        this.acceleration.add(center_force);

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.max_speed);
        this.position.add(this.velocity);

        this.acceleration.mulScalar(0);
        this.GetOrientation();
    }

    GetRandomPosition(){
        var rand_x = Math.random() * this.world_size - 150;
        var rand_y = Math.random() * this.world_size - 150;
        var rand_z = Math.random() * this.world_size - 150;
        
        return new Vector(rand_x, rand_y, rand_z);
    }

    GetOrientation(){
        var quat = new THREE.Quaternion();
        var v = new THREE.Vector3(this.velocity.x, this.velocity.y, this.velocity.z);
        v.normalize();
        quat.setFromUnitVectors(this.vfrom, v);
        
        this.euler_angles.setFromQuaternion(quat);
    }

    Alignment(flock) {
        var sum = new Vector(0, 0, 0);
        var boid_counter = 0;
        
        for(var i = 0; i != flock.length; i++) {
            var dist = this.position.dist(flock[i]["boid"].position);
            if(dist > 0.001 && dist < this.alignment_distance) {
                sum.add(flock[i]["boid"].velocity);
                boid_counter++;
            }
        }
        
        if(boid_counter > 0) {
            sum.divScalar(boid_counter);
            sum.normalize();
            sum.mulScalar(this.max_speed);
            sum.sub(this.velocity);
            sum.limit(this.max_force);
            return sum;
        } else {
            return new Vector(0, 0, 0);
        }
    };

    Cohesion(flock) {
        var boid_counter = 0;
        var sum = new Vector(0, 0, 0);
        
        for(var i = 0; i != flock.length; i++) {
            var dist = this.position.dist(flock[i]["boid"].position);
            if(dist > 0.001 && dist < this.cohesion_distance) {
                sum.add(flock[i]["boid"].position);
                boid_counter++;
            }
        }

        if(boid_counter > 0) {
            sum.divScalar(boid_counter);
            sum.normalize();
            return this.Seek(sum);
        } else {
            return new Vector(0, 0, 0);
        }
    }

    Separation(flock) {
        var boid_counter = 0;
        var steering = new Vector(0, 0, 0);
        
        for(var i = 0; i != flock.length; i++) {
            var dist = this.position.dist(flock[i]["boid"].position);
            if(dist > 0.001 && dist < this.separation_distance) {
                var diff = new Vector(this.position.x, this.position.y, this.position.z);
                diff.sub(flock[i]["boid"].position);
                diff.normalize();
                diff.divScalar(dist);
                steering.add(diff);
                boid_counter++;
            }
        }
        
        if(boid_counter > 0) steering.divScalar(boid_counter);
        if(steering.x == 0 && steering.y == 0 && steering.z) return diff;
        if(steering.mag() > 0) {
            steering.normalize();
            steering.mulScalar(this.max_speed);
            steering.sub(this.velocity);
            steering.limit(this.max_force);
        }
        return steering;
    }

    Seek(target){
        target.sub(this.position)
        target.normalize();
        target.mulScalar(this.max_speed*10);

        target.sub(this.velocity);
        target.limit(this.max_force);

        return target;
    }

    // Disperse(target){
    //     target.sub(this.position);
    //     target.normalize();
    //     target.mulScalar(-this.max_speed*100);
    //     target.sub(this.velocity);
    //     target.limit(this.max_force*10);
    //     return target;
    // }

    KeepInside(limit){
        var centerPosition = new Vector(0, 0, 0); 
        var distance = this.position.dist(centerPosition);
        
        if (distance > limit){
            this.position = this.GetRandomPosition();
        }
    }
    
    GetRandomRange(from, to){ return (Math.random() * to) + from;}
}