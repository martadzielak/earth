//BASIC SETUP

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000, );
camera.position.z = 2;
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

//RENDERER SETUP

renderer.setClearColor("#0e0f24");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

//EARTH MATERIAL

function createEarthMaterial() {
    const earthTexture = new THREE.Texture();
    const loader = new THREE.ImageLoader();
    loader.load("https://i.ibb.co/5TYyj5f/earth-map.png", function (image) {
        earthTexture.image = image;
        earthTexture.needsUpdate = true;
        earthTexture.anisotropy = renderer.getMaxAnisotropy();
        earthTexture.map.minFilter = THREE.LinearFilter;

    });

    const earthMaterial = new THREE.MeshLambertMaterial({
        emissive: "#ffffff",
        emissiveIntensity: 0.1
    });
    earthMaterial.map = earthTexture;
    return earthMaterial;
};

// MESH CREATION AND INSERT

const geometry = new THREE.SphereGeometry(1, 100, 100);
const mesh = new THREE.Mesh(geometry, createEarthMaterial(), );
scene.add(mesh);

// HALO MATERIAL 

const customMaterial = new THREE.ShaderMaterial({
    uniforms: {},
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true
});

//HALO CREATION AND INSERT

const haloGeometry = new THREE.SphereGeometry(1.3, 100, 100);
const halo = new THREE.Mesh(haloGeometry, customMaterial);
scene.add(halo);

//LIGHT

const light = new THREE.AmbientLight(0xffffff);
light.position.set(10, 0, 25);
scene.add(light);

//ROTATION ON MOUSEMOVE

window.onmousedown = function () {
    renderer.domElement.requestPointerLock();
    renderer.domElement.webkitRequestFullscreen();
};
window.onmousemove = function (event) {
    mesh.rotation.y -= event.movementX / 500;
};

//RENDERING

const render = function () {

    requestAnimationFrame(render);
    mesh.rotation.y += 0.001;

    renderer.render(scene, camera);

}

render();