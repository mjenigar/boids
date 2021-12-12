class Boid {
    constructor() {
        // Boid 3d object parameters
        this.radius = 1;
        this.height = 2;
        this.radial_segments = 30;
        this.height_segments = 30;
        this.color = "#4d13b5";
        //#TODO make one
        this.world_size = 500;
        this.max_speed = 0.5;
        this.max_force = 0.003;
        this.alignment_distance = 15;
        this.alignment_factor = 1.6;
        this.cohesion_distance = 18;
        this.cohesion_factor = 0.7;
        this.separation_distance = 10;
        this.separation_factor = 1;

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

        align_force.mulScalar(this.alignment_factor);        
        coh_force.mulScalar(this.alignment_factor);
        sep_force.mulScalar(this.separation_factor);

        this.acceleration.add(coh_force);
        this.acceleration.add(align_force);
        this.acceleration.add(sep_force);

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.max_speed);
        this.position.add(this.velocity);
        
        this.acceleration.mulScalar(0);
        this.GetOrientation();
        this.KeepInside(this.world_size);
    }

    GetRandomPosition(){
        var rand_x = this.GetRandomRange(-this.world_size, this.world_size);
        var rand_y = this.GetRandomRange(-this.world_size, this.world_size);
        var rand_z = this.GetRandomRange(-this.world_size, this.world_size);
        
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
        var count = 0;
        var sum = new Vector(0, 0, 0);
        
        for(var i = 0; i != flock.length; i++) {
            var dist = this.position.dist(flock[i]["boid"].position);
            if(dist > 0.001 && dist < this.alignment_distance) {
                sum.add(flock[i]["boid"].velocity);
                count++;
            }
        }
        
        if(count > 0) {
            sum.divScalar(count);
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
        var sum = new Vector(0, 0, 0);
        var count = 0;

        for(var i = 0; i != flock.length; i++) {
            var dist = this.position.dist(flock[i]["boid"].position);
            if(dist > 0.001 && dist < this.cohesion_distance) {
                sum.add(flock[i]["boid"].position);
                count++;
            }
        }

        if(count > 0) {
            sum.divScalar(count);
            sum.normalize();
            sum.sub(this.position);
            sum.limit(this.max_force);
            return sum;
        } else {
            return new Vector(0, 0, 0);
        }
    }

    Separation(flock) {
        var sum = new Vector(0, 0, 0);
        var count = 0;
        
        for(var i = 0; i != flock.length; i++) {
            var dist = this.position.dist(flock[i]["boid"].position);
            if(dist > 0.001 && dist < this.separation_distance) {
                var diff = new Vector(this.position.x, this.position.y, this.position.z);
                diff.sub(flock[i]["boid"].position);
                diff.normalize();
                diff.divScalar(dist);
                sum.add(diff);
                count++;
            }
        }
        
        if(count > 0) sum.divScalar(count);
        if(sum.x == 0 && sum.y == 0 && sum.z) return diff;
        if(sum.mag() > 0) {
            sum.normalize();
            sum.mulScalar(this.max_speed);
            sum.sub(this.velocity);
            sum.limit(this.max_force);
        }
        return sum;
    }

    KeepInside(limit){
        var centerPosition = new Vector(0, 0, 0); //center of *black circle*
        var distance = this.position.dist(centerPosition);
        
        if (distance > limit){
            this.position = this.GetRandomPosition();
        }
    
    
        // if(this.position.x > limit)
		// 	this.position.x *= -limit + 10;
		// if(this.position.x < -limit)
		// 	this.position.x = limit - 10;
		
        // if(this.position.y > limit)
		// 	this.position.y *= -limit + 10;
		// if(this.position.y < -limit)
		// 	this.position.y = limit - 10;
		
        // if(this.position.z > limit)
		// 	this.position.z *= -limit + 10;
		// if(this.position.z < -limit)
		// 	this.position.z = limit - 10;
    
        }
    
    GetRandomRange(from, to){ return (Math.random() * to) + from;}
}