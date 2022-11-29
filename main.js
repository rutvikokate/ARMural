import { loadGLTF, loadVideo } from "./loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {



  const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './second.mind',
    });

    const {renderer, scene, camera } = mindarThree;

    const chamVideo = await loadVideo("./cham.mp4");
    const guitarVideo = await loadVideo("./guitar.mp4");

   
    
    console.log(mindarThree)

    const geometry = new THREE.PlaneGeometry(1, 0.4);

    /* Chameleon */
    const chamtexture = new THREE.VideoTexture(chamVideo);
    const chamMaterial = new THREE.MeshBasicMaterial({ map: chamtexture });
    const chamPlane = new THREE.Mesh(geometry, chamMaterial);
    
    chamPlane.position.set(0,0,0)

    const chamAnchor = mindarThree.addAnchor(0);
    chamAnchor.group.add(chamPlane);
    chamAnchor.onTargetFound = () => {
      chamVideo.play();
      console.log('played')
    }
   
    chamAnchor.onTargetLost = () => {
      chamVideo.pause();
      console.log('paused')
      console.log(mindarThree.ui.scanningMask.classList.remove('hidden'))
    }
    chamVideo.addEventListener('play', () => {
      chamVideo.loop = true
      chamVideo.currentTime=0;
    });
    /* Chameleon end */


    /* Guitar */
    const guitartexture = new THREE.VideoTexture(guitarVideo);
    const guitarMaterial = new THREE.MeshBasicMaterial({ map: guitartexture });
    const guitarPlane = new THREE.Mesh(geometry, guitarMaterial);
    const guitarAnchor = mindarThree.addAnchor(1);
    guitarAnchor.group.add(guitarPlane);
    guitarAnchor.onTargetFound = () => {
      guitarVideo.play();
      console.log('played')
    }
    guitarAnchor.onTargetLost = () => {
      guitarVideo.pause();
      console.log('paused')
      console.log(mindarThree.ui.scanningMask.classList.remove('hidden'))
    }
    guitarVideo.addEventListener('play', () => {
      guitarVideo.loop = true
      guitarVideo.currentTime=0;
    });




    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }



  start();
});
