import React, {Component} from 'react';
import MapGL from '@urbica/react-map-gl';
import { Geometry } from 'luma.gl'
import { MeshLayer } from '@deck.gl/experimental-layers';
import { MapboxLayer } from '@deck.gl/mapbox';

import 'mapbox-gl/dist/mapbox-gl.css';

import build from './WoodenCabinObj.obj';

const OBJ = require('webgl-obj-loader');

const object = new OBJ.Mesh(build);

const houseGeom = new Geometry({
  id: 'house-geometry',
  attributes: {
    positions: new Float32Array(object.vertices),
    normals: new Float32Array(object.vertexNormals),
    texCoords: new Float32Array(object.textures),
    indices: new Uint16Array(object.indices)
  }
});

const myDeckLayer = new MapboxLayer({
  id: 'MeshLayer',
  type: MeshLayer,
  pickable: true,
  // autoHighlight: true,
  getColor: [50,50,50,50],
  texture: 'WoodCabinDif.jpg',
  data: [{
    position: [37.77392141114508, 55.723356145146304],
    angle: 180,
    roll: 90
  }],
  sizeScale: 1,
  mesh: houseGeom,
  lightSettings: {
    lightsPosition: [0, 50, 2000],
    specularRatio: 0.4,
    ambientRatio: 0.5,
    diffuseRatio: 0.1
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.mapGlRef = React.createRef();

    this.state = {
      data: [],
      polylines: [],
      time: 1,
      viewport: {
        latitude: 55.723356145146304,
        longitude: 37.77392141114508,
        zoom: 17,
        pitch: 50,
        bearing: 15
      }
    }
  }

  componentDidMount() {
    this.map = this.mapGlRef.current.getMap();

    this.map.on('load', () => {
      this.map.addLayer(myDeckLayer);
    });
  }


  render() {
    return (
      <div className="App">
        <MapGL
          ref={this.mapGlRef}
          style={{width: '100%', height: '100vh'}}
          accessToken={'pk.eyJ1IjoicGlrbWFwIiwiYSI6ImNpenF0aGR0aTAwMmEzM3BoaGJ5dmoxcWoifQ.WmTKY_zHXfrtzZ-u3y1Rvw'}
          mapStyle="mapbox://styles/pikmap/cjnu6kgh002zm2rl2rsoam932"
          onViewportChange={viewport => {
            console.log(viewport);
            this.setState({viewport})
          }}
          {...this.state.viewport}
        />
      </div>
    );
  }
}

export default App;
