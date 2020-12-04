export default class Menu{
    constructor(scene){
        this.$navItems = document.querySelectorAll(".mainNav a");

        this.scene = scene;
        this.loader = new THREE.FontLoader();

        this.words = [];

        this.loader.load(fontURL, f => {
            this.setup(f);
        })
    }

    setup(f){
        const fontOption = {
            font: f,
            size: 3,
            height: 0.4,
            curveSegments: 24,
            bevelEnabled: true,
            bevelThickness: 0.9,
            bevelSize: 0.3,
            bevelOffset: 0,
            bevelSegments: 10
          };

          Array.from(this.$navItems)
          .reverse()
          .forEach(($item, i) => {
            // ... get the text ...
            const { innerText } = $item;
    
            const words = new THREE.Group();
    
            // ... and parse each letter to generate a mesh
            Array.from(innerText).forEach((letter, j) => {
              const material = new THREE.MeshPhongMaterial({ color: 0x97df5e });
              const geometry = new THREE.TextBufferGeometry(letter, fontOption);
    
              const mesh = new THREE.Mesh(geometry, material);
              words.add(mesh);
            });
    
            this.words.push(words);
            this.scene.add(words);
          });
    }
}