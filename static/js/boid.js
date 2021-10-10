import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export default class Boid {
        constructor(world, position) {

            /*
             * #TODO 
             *  - add random start position 
             *  - add random velocity 
             *  - limit the moving field inside the simulator container
             *  ...
             */

            this.position = position;
            this.velocity = [1, 0, 0];
            
            this.coneGeo = new THREE.ConeGeometry(2, 2),
            this.coneMaterial = new THREE.MeshStandardMaterial({
                color: 0x00ff00
            }),
            this.boid = new THREE.Mesh(this.coneGeo, this.coneMaterial);

            world.scene.add(this.boid);
            // this.boid.position.set(position[0], position[1], position[2]);
        }
        
        GetCurrentPosition(){
            this.boid.geometry.computeBoundingSphere();
            var vector = this.boid.geometry.boundingSphere.center;
            
            return vector;
        }

        Move() {

            if(this.boid.position.y < 200){
                this.boid.translateY(0.05);
            } else {
                this.boid.position.set(0,0,0);
            }

            console.log("X: " + this.boid.position.x);
            console.log("Y: " + this.boid.position.y);
            console.log("Z: " + this.boid.position.z);
            console.log("");
        }
    }
