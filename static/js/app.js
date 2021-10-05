import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

class World{
    constructor(){
        this.InitWorld();
    }

    InitWorld(){
        this.renderer = new THREE.WebGLRenderer({ antialias: true});    
        this.renderer.shadowMap.enabled = true;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        document.body.appendChild(this.renderer.domElement);
        window.addEventListener('resize', () => { this._OnWindowResize(); }, false);

        // Camera object + params
        const FOV = 60;
        const ASPECT = 1920 / 1080;
        const NEAR = 1.0;
        const FAR = 1000.0;
        this.camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
        this.camera.position.set(75, 20, 0);
        
        // Scene object
        this.scene = new THREE.Scene();

        // The light rays from a DirectionalLight are parallel in the direction.
        let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        light.position.set(20, 100, 10);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        light.shadow.bias = -0.001;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.left = 100;
        light.shadow.camera.right = -100;
        light.shadow.camera.top = 100;
        light.shadow.camera.bottom = -100;
        this.scene.add(light);
        
        /*
            Ambient Light
            Light is spread equally in all directions and distances. 
            So positioning the light different than default position of [0, 0, 0] will make no difference.

            Doesn't cast shadows.
        */
        light = new THREE.AmbientLight(0x101010);
        this.scene.add(light);
        
        // orbit controls allows us to rotate around a central point in 3d world
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.target.set(0, 20, 0);
        controls.update();
        
        // cube map skybox https://en.wikipedia.org/wiki/Cube_mapping
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            '/static/resources/skybox/bkg1_right1.png',
            '/static/resources/skybox/bkg1_left2.png',
            '/static/resources/skybox/bkg1_top3.png',
            '/static/resources/skybox/bkg1_bottom4.png',
            '/static/resources/skybox/bkg1_front5.png',
            '/static/resources/skybox/bkg1_back6.png'
        ]);
        this.scene.background = texture;

        this.Render();
    }

    OnWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    Render() {
        requestAnimationFrame(() => {
            this.renderer.render(this.scene, this.camera);
            this.Render();
        });
    }
}

/* MAIN */
let WORLD = null;

window.addEventListener('DOMContentLoaded', () => {
    WORLD = new World();
})



