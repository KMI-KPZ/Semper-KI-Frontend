import React, {Suspense, useMemo} from 'react';
import {Canvas} from '@react-three/fiber';
import {useLoader} from '@react-three/fiber';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";

import {DRACOLoader, FBXLoader} from "three-stdlib";
import Basic3DViewer from "@/pages/Test/Basic3DViewer";

// define model props as interface
interface ModelProps {
    scale?: number;
    position?: number[];
    rotation?: number[];
    color?: string;
}

const ModelViewer = ({url, modelProps, ...props}: { url: string, modelProps: ModelProps, props: object }) => {
    const {scale = 1, position = [0, 0, 0], rotation = [0, 0, 0]} = modelProps || {};

    if (!url) {
        return (
            <div {...props}>
                <p>URL not provided</p>
            </div>
        );
    };

    // const Model = () => {
    //     const fileExtension = useMemo(() => url.split('.').pop().toLowerCase(), [url]);
    //     let loader;
    //     switch (fileExtension) {
    //         case 'gltf':
    //         case 'glb':
    //             loader = GLTFLoader;
    //             break;
    //         case 'fbx':
    //             loader = FBXLoader;
    //             break;
    //         case 'drc':
    //             loader = DRACOLoader;
    //             break;
    //         case 'stl':
    //         default:
    //             loader = STLLoader;
    //             break;
    //     }
    //     const {scene: scene} = useLoader(loader, url);
    //     return <primitive object={scene} scale={scale} position={position} rotation={rotation}/>;
    // };

    return (
        <div {...props}>
            <Canvas>
                <Suspense fallback={null}>
                    <Model/>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default ModelViewer;