import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import World from './world.js';
import Boid from './boid.js';

let WORLD = null;
const flock = [];

window.addEventListener('DOMContentLoaded', () => {
    WORLD = new World();

    flock.push(new Boid(WORLD));

})

