// Create a scene which will hold all our meshes to be rendered
var scene = new THREE.Scene();

// Create and position a camera
var camera = new THREE.PerspectiveCamera(
    70,                                   // Field of view
    window.innerWidth/window.innerHeight, // Aspect ratio
    0.1,                                  // Near clipping pane
    1000                                  // Far clipping pane
);

// Reposition the camera
camera.position.set(40,40,40);

// Point the camera at a given coordinate
camera.lookAt(new THREE.Vector3(0,80,0))

// Create a renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Size should be the same as the window
renderer.setSize( window.innerWidth, window.innerHeight );

// Set a near white clear color (default is black)
renderer.setClearColor( 0xfff6e6 );

// Enable shadow mapping
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Append to the document
document.body.appendChild( renderer.domElement );

// Add an ambient lights
var ambientLight = new THREE.AmbientLight( 0xffffff, 0.3 );
scene.add( ambientLight );

//Add some text
scene.add( new Three.Mesh(text_geometry) );

// Add a point light that will cast shadows
var pointLight = new THREE.PointLight( 0xffffff,.8 );
pointLight.position.set( 80, 160, 120 );
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
scene.add( pointLight );

// A basic material that shows the geometry wireframe.
var shadowMaterial = new THREE.ShadowMaterial( { color: 0xffffff } );
shadowMaterial.opacity = 0.5;
var groundMesh = new THREE.Mesh(
    new THREE.BoxGeometry( 1000, .1, 1000 ),
    shadowMaterial
);
groundMesh.receiveShadow = true;
scene.add( groundMesh );

loadFont();

requestAnimationFrame(render);

function render() {
    controls.update();

    // Render the scene/camera combnation
    renderer.render(scene, camera);

    // Repeat...
    requestAnimationFrame(render);
}

// Add an orbit control which allows us to move around the scene. See the three.js example for more details
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target = new THREE.Vector3(0,80,0);
controls.maxPolarAngle = Math.PI / 2;
controls.minDistance = 100;
controls.maxDistance = 220;

//SETTINGS
var text = "aems",
height = 2,
size = 10,
curveSegments = 10,
bevelThickness = 1,
bevelSize = 0.3,
bevelSegments = 3,
bevelEnabled = true,
font = undefined
var rotation = 0

function loadFont() {
	var loader = new THREE.FontLoader();
	loader.load('../fonts/helvetiker_regular.typeface.json', function (res) {
	font = res;
	createText();
	});
}

function createText() {
	textGeo = new THREE.TextGeometry( 'Conner Currie', {
	font: font,
	size: size,
	height: height,
	curveSegments:curveSegments,
	weight: "normal",
	bevelThickness:bevelThickness,
	bevelSize:bevelSize,
	bevelSegments:bevelSegments,
	bevelEnabled:bevelEnabled
	});

	textGeo.computeBoundingBox();
	textGeo.computeVertexNormals();
	var text = new THREE.Mesh(textGeo, cubeMat)
	text.position.x = -textGeo.boundingBox.max.x/2;
	text.castShadow = true;
	scene.add(text)
}
