const scene = new THREE.Scene();
let enter = document.querySelector('.enter');

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
        camera.position.z = 5;
        


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();


let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});
// let mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

let meshX = -10

for(var i = 0; i < 15; i++){
let mesh = new THREE.Mesh(geometry, material);
mesh.position.x = (Math.random() - .5) * 10
mesh.position.y = (Math.random() - .5) * 10
mesh.position.z = (Math.random() - .5) * 10
scene.add(mesh)
meshX+= 1
}

var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0,0,0);
scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
light.position.set(0,0,25);
scene.add(light);

const render = function(){
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function onMouseMove(event){
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children, true);
            for (let i = 0; i < intersects.length; i++) {
                let tl = gsap.timeline()
                tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut})
                tl.to(intersects[i].object.scale, .5, {x:.5, ease: Expo.easeOut})
                tl.to(intersects[i].object.position, 1, {x: 2, ease: Expo.easeOut})
                tl.to(intersects[i].object.rotation, 1, {y: Math.PI * .5, ease: Expo.easeOut}, "=-1.5")
    }

}




window.addEventListener('mousemove', onMouseMove)
render();


gsap.to(enter, 1, {opacity: 0, yoyo: true, repeat: -1})