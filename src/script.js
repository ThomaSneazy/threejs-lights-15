import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



//Lights

// Création d'une lumière ambiante avec une intensité de 0.5 et une couleur blanche
const ambienLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambienLight); // Ajout de la lumière ambiante à la scène
gui.add(ambienLight, 'intensity').min(0).max(1).step(0.01).name('AmbientLight'); // Ajout du contrôle de l'intensité de la lumière ambiante dans l'interface graphique
// Création d'une lumière directionnelle avec une intensité de 0.5 et une couleur blanche
const directionalLight = new THREE.DirectionalLight(0xffff, 0.5);
directionalLight.position.set(0, 1, 0); // Positionnement de la lumière directionnelle
scene.add(directionalLight); // Ajout de la lumière directionnelle à la scène
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.01).name('DirectionLight'); // Ajout du contrôle de l'intensité de la lumière directionnelle dans l'interface graphique

// Création d'une lumière hémisphérique avec une couleur rouge (0xff0000) pour le ciel et bleue (0x0000ff) pour le sol
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff);
scene.add(hemisphereLight); // Ajout de la lumière hémisphérique à la scène
gui.add(hemisphereLight, 'intensity').min(0).max(1).step(0.01).name('HemisphereLight'); // Ajout du contrôle de l'intensité de la lumière hémisphérique dans l'interface graphique

// Création d'une lumière ponctuelle avec une couleur jaune (0xff900), une intensité de 0.5, une distance d'éclairage de 10 et une atténuation de 2
const pointLight = new THREE.PointLight(0xff900, 0.5, 10, 2);
pointLight.position.set(1, - 0.5, 1); // Positionnement de la lumière ponctuelle
scene.add(pointLight); // Ajout de la lumière ponctuelle à la scène
gui.add(hemisphereLight, 'intensity').min(0).max(1).step(0.01).name('PointLight'); // Ajout du contrôle de l'intensité de la lumière ponctuelle dans l'interface graphique

// Création d'une lumière de type zone rectangulaire avec une couleur violette (0x4e00ff), une intensité de 2 et une taille de 1x1
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(- 1.5, 0, 1.5); // Positionnement de la lumière de type zone rectangulaire
rectAreaLight.lookAt(new THREE.Vector3()); // Orientation de la lumière vers le point d'origine de la scène
scene.add(rectAreaLight); // Ajout de la lumière de type zone rectangulaire à la scène
gui.add(rectAreaLight, 'intensity').min(0).max(1).step(0.01).name('RectAreaLight'); // Ajout du contrôle de l'intensité de la lumière de type zone rectangulaire dans l'interface graphique

// Création d'une lumière spot avec une couleur verte (0x78ff00), une intensité de 0.5, une distance d'éclairage de 7, un angle d'ouverture de 0.1 radians, une pénombre de 0.25 et un facteur d'atténuation de 1
const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 7, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 2, 3); // Positionnement de la lumière spot
scene.add(spotLight); // Ajout de la lumière spot à la scène
gui.add(spotLight, 'intensity').min(0).max(1).step(0.01).name('SpotLight'); // Ajout du contrôle de l'intensité de la lumière spot dans l'interface graphique

// Création d'un assistant visuel pour la lumière hémisphérique
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2);
scene.add(hemisphereLightHelper); // Ajout de l'assistant visuel à la scène

// Création d'un assistant visuel pour la lumière directionnelle
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
scene.add(directionalLightHelper); // Ajout de l'assistant visuel à la scène

// Création d'un assistant visuel pour la lumière ponctuelle
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper); // Ajout de l'assistant visuel à la scène

// Création d'un assistant visuel pour la lumière spot
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper); // Ajout de l'assistant visuel à la scène


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
