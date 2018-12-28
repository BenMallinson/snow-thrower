import af, { THREE } from 'aframe'

export const present = af.registerComponent('present', {
  schema: {
    width: {type: 'number', default: 0.4},
    height: {type: 'number', default: 0.4},
    depth: {type: 'number', default: 0.4},
    color: {type: 'color', default: 'red'},
    force: {type: 'int', default: 200 },
    target: {type: 'vec3' }
  },

  init: function () {
    var el = this.el;
    var collided = false
    const { height, width, depth, color, force, target } = this.data;

    // Create geometry.
    this.geometry = new THREE.BoxBufferGeometry(width, height, depth);

    // Create material.
    this.material = new THREE.MeshStandardMaterial({color: color});

    // Create mesh.
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    // Set mesh on entity.
    el.setObject3D('mesh', this.mesh);
    el.addEventListener('collide', (e) => {
      console.log('Collided with:' + e.detail.body.el.getAttribute('name'));
      if(e.detail.body.el.getAttribute('name') === 'chimney') {
        e.detail.body.el.setAttribute('color', 'blue')
      }
      if(collided === false && e.detail.body.el.getAttribute('name') === 'chimney')
        collided = true
        setTimeout(() => {
          if(el.body) {
            el.body.world.removeBody(el.body)
            el.parentNode.removeChild(el)
          }
        }, 1000)
    })

    el.addEventListener('body-loaded', () => {
      el.body.force.set(target.x * force, force * 10, target.z * force)
    })
  }
});
