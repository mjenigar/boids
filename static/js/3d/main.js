var camera;
var controls;
var scene;
var renderer;

var world_grid = false;
var world_geometry;
var world_material;
var world_size = 32;
var world_radius = 500;

var n_boids = 50;
var flock = [];

window.addEventListener('DOMContentLoaded', () => {
	init();
	render(flock);
	GenerateFlock();
	LoadValues();

	$(document).on("change", "#grid_on", function () { SwitchGrid();})
	$(document).on("change", "#n_boids", function () { SetNofBoids();})
	$(document).on("change", "#world_size", function () { SetWorldRadius();})
	$(document).on("change", "#max_speed", function () { SetMaxSpeed();})
	$(document).on("change", "#max_force", function () { SetMaxForce();})
	$(document).on("change", "#sep_force", function () { SetSeparationForce();})
	$(document).on("change", "#coh_force", function () { SetCohesionForce();})
	$(document).on("change", "#align_force", function () { SetAlignmentForce();})
	$(document).on("change", "#sep_dist", function () { SetSeparationDistance();})
	$(document).on("change", "#coh_dist", function () { SetCohesionDistance();})
	$(document).on("change", "#align_dist", function () { SetAlignmentDistance();})
	$(document).on("change", "#center_force", function () { SetCenterForce();})
});

function init() {
	mouse = new THREE.Vector2();
	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 100;
	
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
	
	//Orbit Control Setup
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.damping = 0.2;
	$("#controls-navbar").mouseenter(function(){ disableOrbit();});
	$("#controls-navbar").mouseleave(function(){ enableOrbit();});

	// SpawnWorld();
	controls.update();
	animate();
}

function animate() {
	requestAnimationFrame(animate);
	render(flock);
	controls.update();
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

function SpawnWorld(){
	world_geometry = new THREE.SphereGeometry(world_radius, world_size, world_size);
	world_material = new THREE.LineDashedMaterial( { color: "#1c0326", dashSize: 0.5, gapSize: 0.5 } );
	world = new THREE.Line(world_geometry, world_material);
	world.position.set(0, 0, 0);
	scene.add(world);
}

function SpawnBoid(){
	particle = { 
		"boid": undefined,
		"model": undefined
	}

	boid = new Boid(world_radius);
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

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function LoadValues(){
	inputs = ["n_boids", "world_size", "max_speed"];
	
	$("#n_boids").val(n_boids);
	$("#world_size").val(world_radius);
	$("#max_speed").val(flock[0]["boid"].max_speed);
	$("#max_force").val(flock[0]["boid"].max_force);
	$("#sep_force").val(flock[0]["boid"].separation_factor);
	$("#coh_force").val(flock[0]["boid"].cohesion_factor);
	$("#align_force").val(flock[0]["boid"].alignment_factor);
	$("#sep_dist").val(flock[0]["boid"].separation_distance);
	$("#coh_dist").val(flock[0]["boid"].cohesion_distance);
	$("#align_dist").val(flock[0]["boid"].alignment_distance);
	$("#center_force").val(flock[0]["boid"].center_factor);

	$("#n_boids_value").empty().append(n_boids);
	$("#world_size_value").empty().append(world_radius);
	$("#max_speed_value").empty().append(flock[0]["boid"].max_speed);
	$("#max_force_value").empty().append(flock[0]["boid"].max_force);
	$("#sep_force_value").empty().append(flock[0]["boid"].separation_factor);
	$("#coh_force_value").empty().append(flock[0]["boid"].cohesion_factor);
	$("#align_force_value").empty().append(flock[0]["boid"].alignment_factor);
	$("#sep_dist_value").empty().append(flock[0]["boid"].separation_distance);
	$("#coh_dist_value").empty().append(flock[0]["boid"].cohesion_distance);
	$("#align_dist_value").empty().append(flock[0]["boid"].alignment_distance);
	$("#center_force_value").empty().append(flock[0]["boid"].center_factor);
}


/* CONTROL HANDLERS */

function Reset(){
	for(var i = 0; i < flock.length; i++){
		scene.remove(flock[i]["model"]);
	}
	flock = [];
	// scene.remove(world);
	// SpawnWorld();
}

function SwitchGrid(){
	if (!world_grid){
		SpawnWorld();
		world_grid = true;
	} else {
		scene.remove(world);
		world_grid = false;
	}

}

function SetNofBoids(){
	n_boids = $("#n_boids").val();
	$("#n_boids_value").empty().append(n_boids);
	Reset();
	GenerateFlock()
}

function SetWorldRadius(){
	world_radius = $("#world_size").val();
	$("#world_size_value").empty().append(world_radius);
	Reset();
	GenerateFlock();
}

function SetMaxSpeed(){
	max_speed = $("#max_speed").val();
	for(var i = 0; i < flock.length; i++){
		flock[i]["boid"].max_speed = max_speed;
	}
	$("#max_speed_value").empty().append(max_speed);
}

function SetMaxForce(){
	acc = $("#max_force").val();
	for(var i = 0; i < flock.length; i++){
		flock[i]["boid"].max_force = acc;
	}
	$("#max_force_value").empty().append(acc);
}

function SetSeparationForce(){
	force = $("#sep_force").val();
	for(var i = 0; i < flock.length; i++){
		flock[i]["boid"].separation_factor = force;
	}
	$("#sep_force_value").empty().append(force);
}

function SetCohesionForce(){
	force = $("#coh_force").val();
	for(var i = 0; i < flock.length; i++){
		flock[i]["boid"].cohesion_factor = force;
	}
	$("#coh_force_value").empty().append(force);
}

function SetAlignmentForce(){
	force = $("#align_force").val();
	for(var i = 0; i < flock.length; i++){
		flock[i]["boid"].alignment_factor = force;
	}
	$("#align_force_value").empty().append(force);
}

function SetSeparationDistance(){
	dist = $("#sep_dist").val();
	for(var i = 0; i < flock.length; i++){
		flock[i]["boid"].separation_distance = dist;
	}
	$("#sep_dist_value").empty().append(dist);
}

function SetCohesionDistance(){
	dist = $("#coh_dist").val();
	for(var i = 0; i < flock.length; i++){
		flock[i]["boid"].cohesion_distance = dist;
	}
	$("#coh_dist_value").empty().append(dist);
}

function SetAlignmentDistance(){
	dist = $("#align_dist").val();
	for(var i = 0; i < flock.length; i++){
		flock[i]["boid"].alignment_distance = dist;
	}
	$("#align_dist_value").empty().append(dist);
}

function SetCenterForce(){
	force = $("#center_force").val();
	for(var i = 0; i < flock.length; i++){
		flock[i]["boid"].center_factor = force;
	}
	$("#center_force_value").empty().append(dist);
}



function disableOrbit() { 
	controls.enabled = false;
	controls.rotate = false;
	controls.update();
}	
	
function enableOrbit() { 
	controls.enabled = true;
	controls.rotate = true;
	controls.update();
}