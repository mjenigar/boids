import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export default class Simulator{
    constructor(width, height, depth){
        this.width = width;
        this.height = height;
        this.depth = depth;
    }

    SpawnSimulator(WORLD){
        var geometry = new THREE.BoxGeometry(this.width, this.height, this.depth, 10, 10, 10);
        var material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true});
        var cube = new THREE.Mesh(geometry, material);
        
        WORLD.scene.add(cube);
        WORLD.camera.lookAt(cube);
    }
}