var world_size = 24;
var world_radius = 150;

var n_boids = 100;
var flock = [];

window.addEventListener('DOMContentLoaded', () => {
	var camera;
	var controls;
	var scene;
	var renderer;
	
	var world_geometry;
	var world_material;
	
	var bgroup, sgroup, target, targetvel, goahead, keyboard;
	var boidGeometry, boidMaterial, sharkGeometry, sharkMaterial;
	goahead = false;

	init();
	render(flock);
	// SpawnBoid(flock);
	GenerateFlock();
});

function init() {
	mouse = new THREE.Vector2();
	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 100;
	
	setupOrbitControls();
	//Orbit Control Setup
	controls = new THREE.OrbitControls(camera);
	controls.damping = 0.2;
	controls.addEventListener('change', render);

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(0xcccccc, 0.0027);

	color = 0xFFFFFF;
	intensity = 1;
	light = new THREE.AmbientLight(color, intensity);
	scene.add(light);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	window.addEventListener('resize', onWindowResize, false);
	
	world_geometry = new THREE.SphereGeometry(world_radius, world_size, world_size);
	world_material = new THREE.LineDashedMaterial( { color: 0x000000, dashSize: 2, gapSize: 3 } );
	world = new THREE.Line(world_geometry, world_material);
	world.position.set(0, 0, 0);
	scene.add(world);
	
	animate();
}

function animate() {
	requestAnimationFrame(animate);
	render(flock);
}

function render() {
	renderer.render(scene, camera);
	FlockUpdate(flock);
}

function FlockUpdate(flock) {	
	if (flock.length > 0){
		for(var i = 0; i < flock.length; i++){
			flock[i]["boid"].Update(flock);
			flock[i]["model"].position.set(flock[i]["boid"].position.x, flock[i]["boid"].position.y, flock[i]["boid"].position.z);
			flock[i]["model"].rotation.set(flock[i]["boid"].euler_angles.x, flock[i]["boid"].euler_angles.y, flock[i]["boid"].euler_angles.z);
		}
	} else{
		console.log("boids update...");
	}
}

function SpawnBoid(){
	particle = { 
		"boid": undefined,
		"model": undefined
	}

	boid = new Boid();
	coneGeo = new THREE.ConeGeometry(
		boid.radius, 
		boid.height, 
		boid.radial_segments, 
		boid.height_segments
	);
	coneMaterial = new THREE.MeshStandardMaterial({color: boid.color});
	cone = new THREE.Mesh(coneGeo, coneMaterial);
	cone.position.set(boid.position.x, boid.position.y, boid.position.z);
	cone.rotation.set(boid.rotation.x, boid.rotation.y, boid.rotation.z);
	scene.add(cone);

	particle.boid = boid;
	particle.model = cone;

	flock.push(particle);
}

function GenerateFlock(){
	for(i = 0; i < n_boids; i++){
		SpawnBoid();
	}
}

function setupOrbitControls() {
	controls = new THREE.OrbitControls(camera);
	controls.damping = 0.2;
	controls.addEventListener('change', render);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function disableOrbit() { controls.enabled = false;}
function enableOrbit() { controls.enabled = true; }