import af, { THREE } from 'aframe'
import * as present from './present'

export const targetable = af.registerComponent('targetable', {
  schema: {
    distance: {type: 'int', default: 150},
  },
  init: function () {
    var el = this.el;  // <a-box>
    var data = this.data
    el.addEventListener('click', function (event) {
      let scene = document.querySelector('a-scene')
      let entity = document.createElement('a-box')
      entity.setAttribute('present', `force: ${data.distance}; target: ${af.utils.coordinates.stringify(el.getAttribute('position').clone())};`)
      entity.setAttribute('position', af.utils.coordinates.stringify(document.querySelector('#camera').getAttribute('position')))
      entity.setAttribute('dynamic-body', '')
      scene.appendChild(entity)
    });
  }
});
