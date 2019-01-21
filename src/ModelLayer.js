import { MeshLayer } from '@deck.gl/experimental-layers';
import { CompositeLayer } from 'deck.gl';
import { Geometry } from 'luma.gl';

const OBJ = require('webgl-obj-loader');

const defaultProps = {
  getColor: [50,50,50,50],
  texture: null,
  data: [],
  sizeScale: 1,
  mesh: null,
  lightSettings: {
    lightsPosition: [0, 50, 2000],
    specularRatio: 0.4,
    ambientRatio: 0.5,
    diffuseRatio: 0.1
  }
};

export default class ModelLayer extends CompositeLayer {
  initializeState() {
    console.log('init', this.props.id);

    this.state = {
      mesh: null
    };

    fetch(this.props.mesh)
      .then(result => result.text())
      .then(rawObj => new OBJ.Mesh(rawObj))
      .then(object => {
        this.setState({
          mesh: new Geometry({
            id: this.props.id,
            attributes: {
              positions: new Float32Array(object.vertices),
              normals: new Float32Array(object.vertexNormals),
              texCoords: new Float32Array(object.textures),
              indices: new Uint16Array(object.indices)
            }
          })
        });
      });
  }

  shouldUpdateState({changeFlags}) {
    return changeFlags.somethingChanged;
  }

  renderLayers() {
    // for subclassing, override this method to return
    // customized sub layer props
    const { id, getColor, data, texture, sizeScale, lightSettings } = this.props;

    if (!this.state.mesh) {
      return null;
    }

    // return props to the sublayer constructor
    return new MeshLayer({
      id: `mesh-${id}`,
      getColor,
      texture,
      data,
      sizeScale,
      lightSettings,
      mesh: this.state.mesh
    });
  }
}

ModelLayer.layerName = 'ModelLayer';
ModelLayer.defaultProps = defaultProps;
