import React, {Component} from 'react';
import MapGL from '@urbica/react-map-gl';
import { Geometry } from 'luma.gl'
import { MeshLayer } from '@deck.gl/experimental-layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import { featureCollection, point, polygon } from '@turf/helpers';
import pointsWithinPolygon from '@turf/points-within-polygon';
import bboxPolygon from '@turf/bbox-polygon';

import 'mapbox-gl/dist/mapbox-gl.css';

const OBJ = require('webgl-obj-loader');

const models = {
  'house-low': {
    id: 'house-low',
    model: './house-low/model.obj',
    texture: './house-low/texture.jpg',
    position: [37.72392141114508, 55.723956145146304],
    angle: 180,
    roll: 90,
    sizeScale: 0.3
  },
  WoodCabin: {
    id: 'WoodCabin',
    model: './WoodCabin/model.obj',
    texture: './WoodCabin/texture.jpg',
    position: [37.77392141114508, 55.723356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 1
  },
  Patrick :{
    id: 'Patrick',
    model: './Patrick/model.obj',
    texture: './Patrick/texture.png',
    position: [37.79892141114508, 55.723356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 20
  },
  'house-low2': {
    id: 'house-low2',
    model: './house-low/model.obj',
    texture: './house-low/texture.jpg',
    position: [37.72992141114508, 55.723956145146304],
    angle: 180,
    roll: 90,
    sizeScale: 0.3
  },
  WoodCabin2: {
    id: 'WoodCabin2',
    model: './WoodCabin/model.obj',
    texture: './WoodCabin/texture.jpg',
    position: [37.77992141114508, 55.723356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 1
  },
  Patrick2 :{
    id: 'Patrick2',
    model: './Patrick/model.obj',
    texture: './Patrick/texture.png',
    position: [37.79192141114508, 55.723356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 20
  },
  'house-low3': {
    id: 'house-low3',
    model: './house-low/model.obj',
    texture: './house-low/texture.jpg',
    position: [37.71592141114508, 55.723956145146304],
    angle: 180,
    roll: 90,
    sizeScale: 0.3
  },
  WoodCabin3: {
    id: 'WoodCabin3',
    model: './WoodCabin/model.obj',
    texture: './WoodCabin/texture.jpg',
    position: [37.78592141114508, 55.723356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 1
  },
  Patrick3 :{
    id: 'Patrick3',
    model: './Patrick/model.obj',
    texture: './Patrick/texture.png',
    position: [37.78092141114508, 55.723356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 20
  },
  'house-low4': {
    id: 'house-low4',
    model: './house-low/model.obj',
    texture: './house-low/texture.jpg',
    position: [37.71592141114508, 55.713956145146304],
    angle: 180,
    roll: 90,
    sizeScale: 0.3
  },
  WoodCabin4: {
    id: 'WoodCabin4',
    model: './WoodCabin/model.obj',
    texture: './WoodCabin/texture.jpg',
    position: [37.78592141114508, 55.713356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 1
  },
  Patrick4 :{
    id: 'Patrick4',
    model: './Patrick/model.obj',
    texture: './Patrick/texture.png',
    position: [37.78092141114508, 55.713356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 20
  },
  'house-low5': {
    id: 'house-low5',
    model: './house-low/model.obj',
    texture: './house-low/texture.jpg',
    position: [37.74592141114508, 55.733956145146304],
    angle: 180,
    roll: 90,
    sizeScale: 0.3
  },
  WoodCabin5: {
    id: 'WoodCabin5',
    model: './WoodCabin/model.obj',
    texture: './WoodCabin/texture.jpg',
    position: [37.81592141114508, 55.733356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 1
  },
  Patrick5 :{
    id: 'Patrick5',
    model: './Patrick/model.obj',
    texture: './Patrick/texture.png',
    position: [37.88092141114508, 55.733356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 20
  },
  'house-low6': {
    id: 'house-low6',
    model: './house-low/model.obj',
    texture: './house-low/texture.jpg',
    position: [37.72592141114508, 55.723956145146304],
    angle: 180,
    roll: 90,
    sizeScale: 0.3
  },
  WoodCabin6: {
    id: 'WoodCabin6',
    model: './WoodCabin/model.obj',
    texture: './WoodCabin/texture.jpg',
    position: [37.79592141114508, 55.723356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 1
  },
  Patrick6 :{
    id: 'Patrick6',
    model: './Patrick/model.obj',
    texture: './Patrick/texture.png',
    position: [37.79092141114508, 55.723356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 20
  },
  'house-low7': {
    id: 'house-low7',
    model: './house-low/model.obj',
    texture: './house-low/texture.jpg',
    position: [37.75592141114508, 55.733956145146304],
    angle: 180,
    roll: 90,
    sizeScale: 0.3
  },
  WoodCabin7: {
    id: 'WoodCabin7',
    model: './WoodCabin/model.obj',
    texture: './WoodCabin/texture.jpg',
    position: [37.82592141114508, 55.733356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 1
  },
  Patrick7 :{
    id: 'Patrick7',
    model: './Patrick/model.obj',
    texture: './Patrick/texture.png',
    position: [37.82092141114508, 55.733356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 20
  },
  'house-low8': {
    id: 'house-low8',
    model: './house-low/model.obj',
    texture: './house-low/texture.jpg',
    position: [37.78592141114508, 55.753956145146304],
    angle: 180,
    roll: 90,
    sizeScale: 0.3
  },
  WoodCabin8: {
    id: 'WoodCabin8',
    model: './WoodCabin/model.obj',
    texture: './WoodCabin/texture.jpg',
    position: [37.81592141114508, 55.753356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 1
  },
  Patrick8 :{
    id: 'Patrick8',
    model: './Patrick/model.obj',
    texture: './Patrick/texture.png',
    position: [37.81092141114508, 55.753356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 20
  },
  'house-low9': {
    id: 'house-low9',
    model: './house-low/model.obj',
    texture: './house-low/texture.jpg',
    position: [37.78592141114508, 55.763956145146304],
    angle: 180,
    roll: 90,
    sizeScale: 0.3
  },
  WoodCabin9: {
    id: 'WoodCabin9',
    model: './WoodCabin/model.obj',
    texture: './WoodCabin/texture.jpg',
    position: [37.81592141114508, 55.763356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 1
  },
  Patrick9 :{
    id: 'Patrick9',
    model: './Patrick/model.obj',
    texture: './Patrick/texture.png',
    position: [37.81092141114508, 55.763356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 20
  },
};

const getLayer = (model) => new MapboxLayer({
  id: model.id,
  type: MeshLayer,
  pickable: true,
  // autoHighlight: true,
  getColor: [50,50,50,50],
  texture: model.texture,
  data: [
    {
      position: model.position,
      angle: model.angle,
      roll: model.roll
    }
  ],
  sizeScale: model.sizeScale,
  mesh: model.mesh,
  lightSettings: {
    lightsPosition: [0, 50, 2000],
    specularRatio: 0.4,
    ambientRatio: 0.5,
    diffuseRatio: 0.1
  }
});

const diff = function (a1, a2) {
  return a1.filter(i=>!a2.includes(i))
    .concat(a2.filter(i=>!a1.includes(i)))
};

class App extends Component {
  constructor(props) {
    super(props);
    this.mapGlRef = React.createRef();

    this.state = {
      fetchModelIds: [],
      visibleIds: [],
      models: models,
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
  }

  componentDidUpdate(prevProps, prevState) {
    const { _ne, _sw } = this.map.getBounds();
    const polygon = bboxPolygon([_ne.lng, _ne.lat, _sw.lng, _sw.lat]);
    const { models, viewport } = this.state;

    if (viewport.zoom > 15) {
      const collection = featureCollection(
        Object.keys(models).map(key => {
          return point(models[key].position, { id: key })
        })
      );

      const featuresCollection = pointsWithinPolygon(collection, polygon);
      const ids = featuresCollection.features.map(item => item.properties.id);

      ids.forEach(id => {
        console.log(this.state.fetchModelIds);
        const model = models[id];
        if (model.mesh) {
          if (!this.map.getLayer(id)) {
            this.map.addLayer(getLayer(model));
          }
        } else if (!this.state.fetchModelIds.includes(id)) {
          this.addModel(id, model.model);
        }
      });

      if (this.state.visibleIds.length) {
        this.deleteModel(ids);
      }
    } else {
      if (this.state.visibleIds.length) {
        this.deleteModel([]);
      }
    }
  }

  addModel = (id, modelUrl) => {
    fetch(modelUrl)
      .then(result => result.text())
      .then(rawObj => new OBJ.Mesh(rawObj))
      .then(object => {
        this.setState(({ models, visibleIds, fetchModelIds }) => {
          models[id].mesh = new Geometry({
            id,
            attributes: {
              positions: new Float32Array(object.vertices),
              normals: new Float32Array(object.vertexNormals),
              texCoords: new Float32Array(object.textures),
              indices: new Uint16Array(object.indices)
            }
          });

          visibleIds.push(id);
          const fetchKey = fetchModelIds.findIndex(fetchId => fetchId === id);
          fetchModelIds.slice(fetchKey, 1);
          return ({ models, visibleIds, fetchModelIds: fetchModelIds.slice(fetchKey, 1) });
        });
      });

    this.setState((prevState) => {
      const { fetchModelIds } = prevState;
      fetchModelIds.push(id);
      return ({ fetchModelIds })
    })
  };

  deleteModel = (visibleIds) => {
    const deleteIds = diff(this.state.visibleIds, visibleIds);
    const { models } = this.state;

    if (deleteIds.length) {
      deleteIds.forEach(id => {
        if (this.map.getLayer(id)) {
          this.map.removeLayer(id);
          models[id].mesh = null;
        }
      });

      this.setState({ models, visibleIds });
    }
  };

  render() {
    return (
      <div className="App">
        <MapGL
          ref={this.mapGlRef}
          style={{width: '100%', height: '100vh'}}
          accessToken={'pk.eyJ1IjoicGlrbWFwIiwiYSI6ImNpenF0aGR0aTAwMmEzM3BoaGJ5dmoxcWoifQ.WmTKY_zHXfrtzZ-u3y1Rvw'}
          mapStyle="mapbox://styles/pikmap/cjnu6kgh002zm2rl2rsoam932"
          onViewportChange={viewport => {
            this.setState({viewport})
          }}
          {...this.state.viewport}
        />
      </div>
    );
  }
}

export default App;
