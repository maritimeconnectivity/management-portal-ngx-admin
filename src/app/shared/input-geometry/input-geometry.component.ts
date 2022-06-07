import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';

import 'leaflet-draw';
import { getGeometryCollectionFromMap, getSingleGeometryFromMap, populateWKTTextArea } from '../../util/mapToGeometry';
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

    if (this.geometry) {
      this.loadGeometryOnMap(this.geometry, this.map, this.drawnItems, true);
    }

    /*
    // Monitor the WKT string to update the selected area in the map
    $('#geometryWKT').on("input propertychange", function() {
        // For valid text inputs, try to parse the WKT string
        if(this.value && this.value.trim().length>0) {
            var parsedGeoJson = undefined;
            try {
                parsedGeoJson = Terraformer.WKT.parse(this.value);
            } catch(ex) {
                // Nothing to do
            }

            // If a valid GeoJSON object was parsed, replace it in the map
            if(parsedGeoJson) {
                drawnItems.clearLayers();
                addNonGroupLayers(L.geoJson(parsedGeoJson), drawnItems);
            }
        }
    });

    // Initialise the instance edit panel as read-only
    initInstanceEditPanel($('#instanceViewPanel'));
    */
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
    // Do whatever else you need to. (save to db, add to map etc)
    const type = e.layerType;
    const layer = e.layer;
    this.drawnItems.addLayer(layer);

    this.onUpdate.emit({ fieldName: 'geometry', data: getGeometryCollectionFromMap(this.drawnItems)});
    /*
    // Restrict new shapes, only allow edit
    drawControlFull.remove(searchMap);
    drawControlEditOnly.addTo(searchMap)
    */
  }

  /*
  addNonGroupLayers(sourceLayer: any, targetGroup: any) {
    if (sourceLayer instanceof L.LayerGroup) {
        sourceLayer.eachLayer(function(layer) {
            this.addNonGroupLayers(layer, targetGroup);
        });
    } else {
        targetGroup.addLayer(sourceLayer);
    }
  }
  */

  clearMap = () => {
    this.drawnItems.clearLayers();
  }

  loadGeometryOnMap = (geometry, map, drawnItems, fitBounds = true) => {
    // Recreate the drawn items feature group
    drawnItems.clearLayers();
    if(geometry) {
        const geomLayer = L.geoJSON(geometry as geojson.GeoJsonObject);
        drawnItems.addLayer(geomLayer);
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
