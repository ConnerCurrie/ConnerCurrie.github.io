var loader = new THREE.FontLoader();

var text_geometry = loader.load( '../fonts/helvetiker_regular.typeface.json', function ( font ) {

	var geometry = new THREE.TextGeometry( 'Conner Currie!', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelSegments: 5
	} );
} );

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
camera.position.set(-60,80,210);

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

