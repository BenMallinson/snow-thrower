import React, { Component } from 'react';
import './App.css';
import af from 'aframe'
import * as physics from 'aframe-physics-system'
import * as targetable from './components/aframe/targetable'
import * as particles from 'aframe-particle-system-component'

class App extends Component {
  render() {
    const skybox = require('./assets/img/skybox_sun.png')
    const treeObj = require('./assets/tree.obj')
    const treeMtl = require('./assets/tree.mtl')

    return (
      <div className="App">
        <a-scene vr-mode-ui="enabled: true">
          <a-assets>
            <a-asset-item id="tree-obj" src={treeObj}/>
            <a-asset-item id="tree-mtl" src={treeMtl}/>
            <img alt="sky texture" id="skyTexture" src={skybox}/>
          </a-assets>
          <a-entity position="0 20 -15" particle-system="preset: snow; particleCount: 15000" />
            <a-entity id="camera"
                      camera
                      position="0 1.6 0"
                      look-controls="pointerLockEnabled: true"
                      near="0.1" user-height="0">
              <a-entity cursor="fuse: true;"
                        position="0 0 -2"
                        geometry="primitive: ring"
                        material="color: red; shader: flat"
                        raycaster="far: 20; interval: 500; objects: .clickable"
                        scale="0.2 0.2 0.2">
                <a-animation begin="cursor-fusing" easing="ease-in" attribute="scale" dur="1500"
                             fill="backwards" from="0.2 0.2 0.2" to="0.1 0.1 0.1" />
            </a-entity>
          </a-entity>
          <a-box static-body name="chimney" class="clickable" className="box" color="orange" scale="0.5 2 0.5" position="-3 4 -14.5" targetable="distance: 250;" />
          <a-box static-body name="house" color="red" scale="5 5 5" position="-4 0.5 -16"/>
          <a-box static-body name="chimney" class="clickable" className="box" color="yellow" scale="1 2 1" position="5 5.5 16.5" targetable="distance: 260;" />
          <a-box static-body name="house" color="red" scale="5 5 5" position="3.5 2 15.5"/>
          <a-cylinder material="shader: flat;" position="0 0 0" color="FEFEFE" static-body name="floor" id="ground" radius="1000" height="0.1" repeat="10 10"/>
          <a-sky id="background" src="#skyTexture" theta-length="90" radius="60"/>
          <a-entity light="type: point; color: #f4f4f4; intensity: 0.2; distance: 0" position="8 10 18"/>
          <a-entity light="type: point; color: #f4f4f4; intensity: 0.6; distance: 0" position="-8 10 -18"/>
          <a-entity light="type: ambient; color: #f4f4f4; intensity: 0.4;" position="-8 10 -18"/>
          <a-entity obj-model="obj: #tree-obj; mtl: #tree-mtl" position="-4 0 -2"/>
          <a-entity obj-model="obj: #tree-obj; mtl: #tree-mtl" position="4 0 2"/>
        </a-scene>
      </div>
    );
  }
}

export default App;
