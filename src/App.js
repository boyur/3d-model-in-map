import React, {Component} from 'react';
import MapGL from '@urbica/react-map-gl';
import { MapboxLayer } from '@deck.gl/mapbox';
import { featureCollection, point } from '@turf/helpers';
import pointsWithinPolygon from '@turf/points-within-polygon';
import bboxPolygon from '@turf/bbox-polygon';
import ModelLayer from './ModelLayer';

import 'mapbox-gl/dist/mapbox-gl.css';

const models = {
  'house-low': {
    id: 'house-low',
    mesh: './house-low/model.obj',
    texture: './house-low/texture.jpg',
    position: [37.72392141114508, 55.723956145146304],
    angle: 180,
    roll: 90,
    sizeScale: 0.3
  },
  WoodCabin: {
    id: 'WoodCabin',
    mesh: './WoodCabin/model.obj',
    texture: './WoodCabin/texture.jpg',
    position: [37.77392141114508, 55.723356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 1
  },
  Patrick :{
    id: 'Patrick',
    mesh: './Patrick/model.obj',
    texture: './Patrick/texture.png',
    position: [37.79892141114508, 55.723356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 20
  },
  'house-low2': {
    id: 'house-low2',
    mesh: './house-low/model.obj',
    texture: './house-low/texture.jpg',
    position: [37.72992141114508, 55.723956145146304],
    angle: 180,
    roll: 90,
    sizeScale: 0.3
  },
  WoodCabin2: {
    id: 'WoodCabin2',
    mesh: './WoodCabin/model.obj',
    texture: './WoodCabin/texture.jpg',
    position: [37.77992141114508, 55.723356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 1
  },
  Patrick2 :{
    id: 'Patrick2',
    mesh: './Patrick/model.obj',
    texture: './Patrick/texture.png',
    position: [37.79192141114508, 55.723356145146304],
    angle: 180,
    roll: 90,
    sizeScale: 20
  },
  'house-low3': {
    id: 'house-low3',
    mesh: './house-low/model.obj',
    texture: './house-low/texture.jpg',
    position: [37.71592141114508, 55.723956145146304],
    angle: 180,
    roll: 90,
    sizeScale: 0.3
  },
};

const getLayer = (model) => new MapboxLayer({
  id: model.id,
  type: ModelLayer,
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
        const model = models[id];
         this.addModel(model);
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

  addModel = (model) => {
    if (!this.map.getLayer(model.id)) {
      console.log('add', model.id);
      this.map.addLayer(getLayer(model));
      this.setState(({ visibleIds }) => {
        visibleIds.push(model.id);
        return ({ visibleIds })
      });
    }
  };

  deleteModel = (visibleIds) => {
    const deleteIds = diff(this.state.visibleIds, visibleIds);
    const { models } = this.state;

    if (deleteIds.length) {
      deleteIds.forEach(id => {
        if (this.map.getLayer(id)) {
          this.map.removeLayer(id);
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
