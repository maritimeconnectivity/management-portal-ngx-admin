/*
 * Copyright (c) 2022 Maritime Connectivity Platform Consortium
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';

import 'leaflet-draw';
import { addNonGroupLayers, getGeometryCollectionFromMap, removeLayers } from '../../util/mapToGeometry';
const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
const iconUrl = 'assets/leaflet/marker-icon.png';
const shadowUrl = 'assets/leaflet/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'ngx-input-geometry',
  templateUrl: './input-geometry.component.html',
  styleUrls: ['./input-geometry.component.scss']
})
export class InputGeometryComponent implements OnInit {
  @Input() isEditing: boolean;
  @Input() isForSearch: boolean;
  @Input() geometry: object;

  @Output() onUpdate = new EventEmitter<any>();

  drawnItems: L.FeatureGroup;
  drawnItemsForSearch: L.FeatureGroup;
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
    this.drawnItemsForSearch = new L.FeatureGroup();
    this.map.addLayer(this.drawnItemsForSearch);

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
    if(this.isForSearch) {
      addNonGroupLayers(layer, this.drawnItemsForSearch);
    this.onUpdate.emit({ fieldName: 'geometry', data: getGeometryCollectionFromMap(this.drawnItemsForSearch)});
    } else {
      addNonGroupLayers(layer, this.drawnItems);
    this.onUpdate.emit({ fieldName: 'geometry', data: getGeometryCollectionFromMap(this.drawnItems)});
    }
    
  }

  handleDeletion = (e: any) => {
    const layer = e.layer;
    removeLayers(layer, this.drawnItems);
    this.onUpdate.emit({ fieldName: 'geometry', data: getGeometryCollectionFromMap(this.drawnItems)});
  }

  clearMap = () => {
    this.drawnItems.clearLayers();
    this.drawnItemsForSearch.clearLayers();
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
