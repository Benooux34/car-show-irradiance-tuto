import { useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect } from 'react'
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Car() {

    const gltf = useLoader(
        GLTFLoader,
        '/car4/scene.gltf'
    );

    useEffect(() => {
        gltf.scene.scale.set(0.01, 0.01, 0.01);
        gltf.scene.position.set(0, 0, -3.5);
        gltf.scene.rotation.set(0, 0, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf]);

    useFrame((state, delta) => {
        let t = state.clock.getElapsedTime()

        let group = gltf.scene.children[0].children[0].children[0]
        group.children[6].rotation.x = t * 2
        group.children[9].rotation.x = t * 2
        group.children[10].rotation.x = t * 2
        group.children[4].rotation.x = t * 2
    })
  return <primitive object={gltf.scene} />
}

export default Car