import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import World from './world.js';
import Simulator from './simulator.js';
import Boid from './boid.js';

let MAX_FPS = 30

let WORLD = null;
const flock = [];

window.addEventListener('DOMContentLoaded', () => {
    WORLD = new World();

    var simulator = new Simulator(500, 500, 500);
    simulator.SpawnSimulator(WORLD);

    flock.push(new Boid(WORLD, {"x": 100, "y": 100, "z": 100}));

    flock[0].GetCurrentPosition();

    Animate();
})

function Animate() {
    setTimeout( function() {
        requestAnimationFrame(Animate);
    }, 1000 / MAX_FPS);

    WORLD.renderer.render(WORLD.scene, WORLD.camera);
    WORLD.controls.update();

    flock[0].Move();
    // WORLD.camera.translateX( 1 )

}
