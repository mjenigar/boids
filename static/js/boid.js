import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export default class Boid {
        constructor(world) {
            // this.position = [x, y, z]
            // this.velocity = p5.Vector.random2D();
            // this.acceleration = createVector();
            
            this.coneGeo = new THREE.ConeGeometry(2, 2),
            this.coneMaterial = new THREE.MeshStandardMaterial({
                color: 0x00ff00
            }),
            this.boid = new THREE.Mesh(this.coneGeo, this.coneMaterial);

            world.scene.add(this.boid);
        }

        // update() {
        //     this.position.add(this.velocity);
        //     this.velocity.add(this.acceleration);
        // }
    }
