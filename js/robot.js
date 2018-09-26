var ChristmasTree = function() {

    THREE.Group.apply(this, arguments);


    // A material for the arm
    var armMaterial = new THREE.MeshStandardMaterial( {
        color: 	0xffffff,
        shading: THREE.FlatShading,
        metalness: 0.1,
        roughness: 0.5,
        refractionRatio: 0.25
    } );

    // A material for the arm
    var armMaterial2 = new THREE.MeshStandardMaterial( {
        color: 	0xff0000,
        shading: THREE.FlatShading,
        metalness: 0.2,
        roughness: 0.5,
        refractionRatio: 0.25
    } );

    //Arm_Base
    var Arm_Base = new THREE.Mesh( new THREE.CylinderGeometry(40, 40, 25, 14, 0.75), armMaterial );
    Arm_Base.position.y += 17.5;
    Arm_Base.castShadow = true;
    Arm_Base.receiveShadow = true;

    //Arm_Base_2
    var Arm_Base_2 = new THREE.Mesh(new THREE.BoxGeometry( 40, 50, 10), armMaterial );
    Arm_Base_2.position.y += 42.5;
    Arm_Base_2.position.z += 15;
    Arm_Base_2.castShadow = true;
    Arm_Base_2.receiveShadow = false;

    //Arm_Base_3
    var Arm_Base_3 = new THREE.Mesh(new THREE.BoxGeometry( 40, 50, 10), armMaterial );
    Arm_Base_3.position.y += 42.5;
    Arm_Base_3.position.z -= 15;
    Arm_Base_3.castShadow = true;
    Arm_Base_3.receiveShadow = false;

    //Arm_Base_4
    var Arm_Base_4 = new THREE.Mesh( new THREE.CylinderGeometry(12, 12, 50, 14, 0.75), armMaterial2 );
    Arm_Base_4.position.y += 50;
    Arm_Base_4.rotation.x = Math.PI / 2;
    Arm_Base_4.castShadow = true;
    Arm_Base_4.receiveShadow = true;

    this.add(Arm_Base);
    this.add(Arm_Base_2);
    this.add(Arm_Base_3);
    this.add(Arm_Base_4);

    var extrudeSettings = {
        steps: 1,
        amount: 16,
        curveSegments: 1,
        bevelEnabled: true,
        bevelThickness: 5,
        bevelSize: 5,
        bevelSegments: 1
    };

    var treeGroup = new THREE.Group();

    treeGroup.position.y += 180;
    treeGroup.position.x -= 60;
    treeGroup.position.z += 10;
    treeGroup.rotateZ(Math.PI);
    treeGroup.rotateY(Math.PI);
    treeGroup.scale.set(1.2,1.2,1.2);

    this.add(treeGroup);

}
ChristmasTree.prototype = Object.create(THREE.Group.prototype);
ChristmasTree.prototype.constructor = ChristmasTree;
ChristmasTree.prototype.updatePosition = function() {
};

var Star = function() {

    THREE.Group.apply(this, arguments);

    var starShape = new THREE.Shape([
        new THREE.Vector2(0, 50),
        new THREE.Vector2(10, 10),
        new THREE.Vector2(40, 10),
        new THREE.Vector2(20, -10),
        new THREE.Vector2(30, -50),
        new THREE.Vector2(0, -20),
        new THREE.Vector2(-30, -50),
        new THREE.Vector2(-20, -10),
        new THREE.Vector2(-40, 10),
        new THREE.Vector2(-10, 10)
    ]);

    var geometry = new THREE.ExtrudeGeometry(starShape, {
        steps: 1,
        amount: 4,
        curveSegments: 1,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 10,
        bevelSegments: 1
    });
    addNoise(geometry, 0, 0, 2);

    var star = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
        color: 0xffd423,
        shading: THREE.FlatShading,
        metalness: 0,
        roughness: 0.8,
        refractionRatio: 0.25,
        emissive: 0xffd423,
        emissiveIntensity: 0.4
    }));
    star.scale.set(.3, .3, .3);
    this.add(star);

    var pointLight = new THREE.DirectionalLight( 0xffd423,.4);
    pointLight.position.set( 0, 10, 0);

    this.add( pointLight );
}
Star.prototype = Object.create(THREE.Group.prototype);
Star.prototype.constructor = Star;
Star.prototype.updatePosition = function() {
    this.rotateY(0.005);
};



var Present = function() {

    THREE.Group.apply(this, arguments);

     // A random color assignment
    var colors = ['#ff0051', '#a53c6c','#f19fa0','#72bdbf','#47689b'],
        boxColor = colors.splice( Math.floor(Math.random()*colors.length), 1 )[0];
        colors.push('#393839'),
        ribbonColor = colors.splice( Math.floor(Math.random()*colors.length), 1 )[0],
        boxMaterial = new THREE.MeshStandardMaterial( {
            color: boxColor,
            shading: THREE.FlatShading,
            metalness: 0,
            roughness: 1
        }),
        ribbonMaterial = new THREE.MeshStandardMaterial( {
            color: ribbonColor,
            shading: THREE.FlatShading,
            metalness: 0,
            roughness: 1
        });

    var box = new THREE.Mesh(
        addNoise(new THREE.BoxGeometry( 20, 12, 15), 2,1, 2),
        boxMaterial
    );
    box.position.y += 6;
    box.castShadow = true;
    box.receiveShadow = true;
    this.add(box);

    box = new THREE.Mesh(
        addNoise(new THREE.BoxGeometry( 22, 14, 2),.5),
        ribbonMaterial
    );
    box.position.y += 6;
    box.castShadow = true;
    box.receiveShadow = true;
    this.add(box);

    box = new THREE.Mesh(
        addNoise(new THREE.BoxGeometry( 2, 14, 17),.5),
        ribbonMaterial
    );
    box.position.y += 6;
    box.castShadow = true;
    box.receiveShadow = true;
    this.add(box);

    var bow = new THREE.Mesh(
        addNoise(new THREE.TorusGeometry(2, 1, 4, 4), 0.5),
        ribbonMaterial
    );
    bow.position.x -= 2;
    bow.position.y += 14;
    bow.rotateZ(-1*Math.PI/1.5);

    bow.castShadow = true;
    bow.receiveShadow = true;
    this.add(bow);

    bow = new THREE.Mesh(
        addNoise(new THREE.TorusGeometry(2, 1, 4, 4), 0.5),
        ribbonMaterial
    );
    bow.position.x += 2;
    bow.rotateZ(Math.PI/1.5);
    bow.position.y += 14;
    bow.castShadow = true;
    bow.receiveShadow = true;
    this.add(bow);

    this.scale.set(2,2,2);

}

Present.prototype = Object.create(THREE.Group.prototype);
Present.prototype.constructor = Present;

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

// Add the tree
var tree = new ChristmasTree();
scene.add(tree);

// Loop around the tree, adding presents every 20 to 40 degrees.
for(var angle = 0; angle < 360; angle += Math.random()*20+20) {
    var p = new Present();
    var radius = Math.random() * 40 + 80;
    p.position.x =  Math.cos(angle * Math.PI / 180) * radius;
    p.position.z =  Math.sin(angle * Math.PI / 180) * radius;
    p.scale.set(Math.random() + 1, Math.random() + 1,Math.random() + 1);
    scene.add(p);
}


// Add an orbit control which allows us to move around the scene. See the three.js example for more details
// https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target = new THREE.Vector3(0,80,0);
controls.maxPolarAngle = Math.PI / 2;
controls.minDistance = 100;
controls.maxDistance = 220;

requestAnimationFrame(render);

function render() {
    controls.update();

    // Update animated elements
    tree.updatePosition();

    // Render the scene/camera combnation
    renderer.render(scene, camera);

    // Repeat...
    requestAnimationFrame(render);
}

/**
 * Helper function to add random noise to geometry vertixes
 *
 * @param geometry The geometry to alter
 * @param noiseX Amount of noise on the X axis
 * @param noiseY Amount of noise on the Y axis
 * @param noiseZ Amount of noise on the Z axis
 * @returns the geometry object
 */

function addNoise(geometry, noiseX, noiseY, noiseZ) {

    var noiseX = noiseX || 2;
    var noiseY = noiseY || noiseX;
    var noiseZ = noiseZ || noiseY;

    for(var i = 0; i < geometry.vertices.length; i++){
        var v = geometry.vertices[i];
        v.x += -noiseX / 2 + Math.random() * noiseX;
        v.y += -noiseY / 2 + Math.random() * noiseY;
        v.z += -noiseZ / 2 + Math.random() * noiseZ;
    }

    return geometry;
}

function addShapeNoise(shapes, noiseX, noiseY) {

    var noiseX = noiseX || 2;
    var noiseY = noiseY || noiseX;

    for(var i = 0; i < shapes.length; i++){
        var v = shapes[i];
        v.x += -noiseX / 2 + Math.random() * noiseX;
        v.y += -noiseY / 2 + Math.random() * noiseY;
        shapes[i] = v;
    }

    return shapes;
}