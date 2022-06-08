import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';

import 'leaflet-draw';
import { addNonGroupLayers, getGeometryCollectionFromMap, removeLayers } from '../../util/mapToGeometry';
@Component({
  selector: 'ngx-input-geometry',
  templateUrl: './input-geometry.component.html',
  styleUrls: ['./input-geometry.component.scss']
})
export class InputGeometryComponent implements OnInit {
  @Input() isEditing: boolean;
  @Input() geometry: object;

  @Output() onUpdate = new EventEmitter<any>();

  drawnItems: L.FeatureGroup;
  layersControl: any;
  controlWithEdit: any;
  controlWithoutEdit: any;
  map: any;
  
  constructor() { }
  
  initMap = (container: any) => {
    // Initialise the map before we need it
    const map = L.map(container).setView([55.692864, 12.599246], 5);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { maxZoom: 18, minZoom: 3, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' })
      .addTo(map);
    return map;
  }

  ngOnInit(): void {
    this.map = this.initMap('searchMap');

    // FeatureGroup is to store editable layers
    this.drawnItems = new L.FeatureGroup();
    this.map.addLayer(this.drawnItems);
    const instanceItems = new L.FeatureGroup();
    this.map.addLayer(instanceItems);

    // Initialise the draw controls
    this.controlWithEdit = this.initDrawControlWithEdit(this.drawnItems);
    this.controlWithoutEdit = this.initDrawControlWithoutEdit(this.drawnItems);
    this.applyEditingToMap(this.isEditing, this.map);

    this.map.on(L.Draw.Event.CREATED, this.handleCreation );
    this.map.on(L.Draw.Event.DELETED, this.handleDeletion );

    this.loadGeometry();
  }

  applyEditingToMap = (isEditing: boolean, searchMap: any = this.map) => {
    // Initialise the draw controls
    if (isEditing) {
      searchMap.removeControl(this.controlWithoutEdit);
      searchMap.addControl(this.controlWithEdit);
    } else {
      searchMap.removeControl(this.controlWithEdit);
      searchMap.addControl(this.controlWithoutEdit);
    }
  }

  handleCreation = (e: any) => {
    const layer = e.layer;
    addNonGroupLayers(layer, this.drawnItems);
    this.onUpdate.emit({ fieldName: 'geometry', data: getGeometryCollectionFromMap(this.drawnItems)});
  }

  handleDeletion = (e: any) => {
    const layer = e.layer;
    removeLayers(layer, this.drawnItems);
    this.onUpdate.emit({ fieldName: 'geometry', data: getGeometryCollectionFromMap(this.drawnItems)});
  }

  clearMap = () => {
    this.drawnItems.clearLayers();
  }

  loadGeometry = (geometry: any = this.geometry) => {
    if (geometry) {
      this.loadGeometryOnMap(geometry, this.map, this.drawnItems, true);
    }
  }

  loadGeometryOnMap = (geometry, map, drawnItems, fitBounds = true) => {
    // Recreate the drawn items feature group
    drawnItems.clearLayers();
    if (geometry) {
      const geomLayer = L.geoJSON(geometry as geojson.GeoJsonObject);
      addNonGroupLayers(geomLayer, drawnItems);
      if(fitBounds) {
          setTimeout(() => map.fitBounds(geomLayer.getBounds()), 50);
      } else {
          map.setView(geomLayer.getBounds().getCenter());
      }
    }
  }

  initDrawControlWithoutEdit = (drawnItems) => {
    return new L.Control.Draw({
        edit: {
            featureGroup: drawnItems,
            remove: false,
            edit: false,
        },
        draw: undefined,
    });
  }

  initDrawControlWithEdit = (drawnItems) => {
    return new L.Control.Draw({
        draw: {
            marker: false,
            polyline: {
              shapeOptions: {
                color: '#f357a1',
                weight: 10,
              },
            },
            polygon: {
              shapeOptions: {
                color: '#f357a1',
                weight: 10,
              },
            },
            rectangle: {
              shapeOptions: {
                color: '#f357a1',
                weight: 10,
              },
            },
            circle: false,
            circlemarker: false,
        },
        edit: {
            featureGroup: drawnItems,
        }
    });
  }
}
