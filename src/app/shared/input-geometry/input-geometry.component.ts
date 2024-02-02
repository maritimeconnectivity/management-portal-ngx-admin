import { AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
/*
 * Copyright (c) 2024 Maritime Connectivity Platform Consortium
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

import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
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
export class InputGeometryComponent implements OnChanges, OnDestroy, AfterViewInit {
  @Input() isEditing: boolean;
  @Input() isForSearch: boolean;
  @Input() geometries: object[];
  @Input() geometryNames: string[];

  @Output() onUpdate = new EventEmitter<any>();

  responseFeatureGroup: L.FeatureGroup;
  queryFeatureGroup: L.FeatureGroup;
  layersControl: any;
  controlWithEdit: any;
  controlWithoutEdit: any;
  controlForSearch: any;
  map: any;

  constructor() { }

  initMap = (container: any) => {
    const map = L.map(container).setView([55.692864, 12.599246], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { maxZoom: 18, minZoom: 2, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
    return map;
  }

  ngAfterViewInit(): void {
    // Initialise the map before we need it
    this.map = this.initMap('map');

    // FeatureGroup is to store editable layers
    this.responseFeatureGroup = new L.FeatureGroup();
    this.map.addLayer(this.responseFeatureGroup);
    this.queryFeatureGroup = new L.FeatureGroup();
    this.map.addLayer(this.queryFeatureGroup);

    // Initialise the draw controls
    this.controlWithEdit = this.initDrawControlWithEdit(this.responseFeatureGroup);
    this.controlWithoutEdit = this.initDrawControlWithoutEdit(this.responseFeatureGroup);
    this.controlForSearch = this.initDrawControlForSearch(this.queryFeatureGroup);

    // apply draw controls
    if (this.isForSearch) {
      this.applySearchToMap(this.map);
    } else {
      this.applyEditingToMap(this.isEditing, this.map);
    }

    this.map.on(L.Draw.Event.CREATED, this.handleCreation );
    this.map.on(L.Draw.Event.DELETED, this.handleDeletion );

    this.loadGeometryOnMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadGeometryOnMap();
  }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    // say good bye to leaflet map before leaving
    this.destroyMap();
  }

  destroyMap = () => {
    if (this.map) {
      // remove leaflet element
      this.map.off();
      this.map = this.map.remove();

      // remove leaflet element from DOM
      const container = L.DomUtil.get('map');
      if(container){
        container.remove();
      }
    }
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

  applySearchToMap = (searchMap: any = this.map) => {
    // Initialise the draw controls
    searchMap.addControl(this.controlForSearch);
  }

  handleCreation = (e: any) => {
    // clear map before 
    this.clearMap();
    const layer = e.layer;
    addNonGroupLayers(layer, this.isForSearch ? this.queryFeatureGroup : this.responseFeatureGroup);
    this.onUpdate.emit({ fieldName: 'geometry',
      data: getGeometryCollectionFromMap( this.isForSearch ? this.queryFeatureGroup : this.responseFeatureGroup)});
  }

  handleDeletion = (e: any) => {
    const layer = e.layer;
    removeLayers(layer, this.responseFeatureGroup);
    this.onUpdate.emit({ fieldName: 'geometry', data: getGeometryCollectionFromMap(this.responseFeatureGroup)});
  }

  clearMap = () => {
    this.geometries = [];
    this.geometryNames = [];
    this.responseFeatureGroup.clearLayers();
    this.queryFeatureGroup.clearLayers();
  }

  loadGeometryOnMap = () => {
    // there is nothing to draw!
    if (!this.geometries || this.geometries.length === 0) {
      return ;
    }

    // Recreate the drawn items feature group
    if (this.responseFeatureGroup) {
      this.responseFeatureGroup.clearLayers();
    } else {
      this.responseFeatureGroup = new L.FeatureGroup();
    }

    this.geometries.forEach( (geometry: any, i: number) =>
    {
      const geomLayer = L.geoJSON(geometry as geojson.GeoJsonObject);
      addNonGroupLayers(geomLayer, this.responseFeatureGroup);
      // assign name plate to the region
      if (this.geometryNames && this.geometryNames.length > 0 && this.geometryNames[i]) {
        if (geometry.type === 'Point') {
          const coordinate = geometry.coordinates;
          this.setToolTip(this.geometryNames[i], coordinate[1], coordinate[0]);
        } else {
          const coordinate = geomLayer.getBounds().getCenter();
          this.setToolTip(this.geometryNames[i], coordinate.lat, coordinate.lng);
        }
      }
    });
    if (this.map) {
      this.map.fitBounds(this.responseFeatureGroup.getBounds());
    }
  }

  setToolTip = (tooltipString: string, lat: number, lng: number) => {
    const marker = L.marker([lat, lng], { opacity: 0.01 }); //opacity may be set to zero
    marker.bindTooltip(tooltipString, {permanent: true, className: "my-label", offset: [0, 0] });
    marker.addTo(this.responseFeatureGroup);
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
                color: '#f35f57',
                weight: 10,
              },
            },
            rectangle: false,
            polygon: {
              shapeOptions: {
                color: '#f35f57',
                weight: 10,
              },
            },
            circle: false,
            circlemarker: false,
        },
        edit: {
            featureGroup: drawnItems,
        },
  });
  }

  initDrawControlForSearch = (drawnItems) => {
    return new L.Control.Draw({
      draw: {
          marker: {
            icon: iconDefault,
          },
          polyline: {
            shapeOptions: {
              color: '#f35f57',
              weight: 10,
            },
          },
          rectangle: false,
          polygon: {
            shapeOptions: {
              color: '#f35f57',
              weight: 10,
            },
          },
          circle: false,
          circlemarker: false,
      },
      edit: {
          featureGroup: drawnItems,
      },
  });
  }
}
