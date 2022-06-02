import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';
import { wktToGeoJSON, geojsonToWKT } from "@terraformer/wkt"

@Component({
  selector: 'ngx-input-geometry',
  templateUrl: './input-geometry.component.html',
  styleUrls: ['./input-geometry.component.scss']
})
export class InputGeometryComponent implements OnInit {
  @Input() geometry: object;

  options = {};
  geoObject: any;
  layers = [];
  fitBounds: any = null;
  drawnItems: L.FeatureGroup;
  wktText: string;
  layersControl: any;
  
  constructor() { }

  ngOnInit(): void {
    this.options = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18, minZoom: 3, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }),
      ],
      controls: {
        draw: {
          marker: false,
          polyline: true,
          polygon: true,
          rectangle: true,
          circle: false,
          circlemarker: false,
        },
      },
      zoom: 5,
      center: L.latLng({ lat: 55.692864, lng: 12.599246 }),
    };

    

    if (this.geometry) {
      this.geoObject = L.geoJSON(this.geometry as geojson.GeoJsonObject);
      this.layers = [this.geoObject];
      this.fitBounds = this.geoObject.getBounds();
    }
  }

  loadGeometryOnMap(geometry, map, drawnItems, fitBounds=true) {
    // Recreate the drawn items feature group
    drawnItems.clearLayers();
    if(geometry) {
        const geomLayer = L.geoJSON(geometry as geojson.GeoJsonObject);
        this.addNonGroupLayers(geomLayer, drawnItems);
        if(fitBounds) {
            setTimeout(() => map.fitBounds(geomLayer.getBounds()), 50);
        } else {
            map.setView(geomLayer.getBounds().getCenter());
        }
    }
  }

  addNonGroupLayers(sourceLayer, targetGroup) {
    if (sourceLayer instanceof L.LayerGroup) {
        sourceLayer.eachLayer(function(layer) {
            this.addNonGroupLayers(layer, targetGroup);
        });
    } else {
        targetGroup.addLayer(sourceLayer);
    }
  }

  populateWKTTextArea = () => {
    const geometry = this.getSingleGeometryFromMap(this.drawnItems);
    if(geometry) {
        console.log(geojsonToWKT(geometry));
    } else {
        this.wktText = '';
    }
  }

  getSingleGeometryFromMap= (drawnItems) => {
    // Initialise a single geometry object
    var geometry = undefined;
    console.log(drawnItems.toGeoJSON());
    drawnItems.toGeoJSON().features.forEach(feature => {
        geometry = feature.geometry;
    });
    // And return
    return geometry;
  }

  getGeometryCollectionFromMap(drawnItems) {
    // Initialise a geometry collection
    var geometry = {
        type: "GeometryCollection",
        geometries: []
    };
    drawnItems.toGeoJSON().features.forEach(feature => {
        geometry.geometries.push(feature.geometry);
    });
    // And return
    return geometry;
  }

  initDrawControlEditOnly(drawnItems) {
    /*
    drawControlEditOnly = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems,
            remove: true
        },
        draw: false
    });
    */
  }

  initDrawControlFull(drawnItems) {
    /*
    drawControlFull = new L.Control.Draw({
        draw: {
            marker: false,
            polyline: true,
            polygon: true,
            rectangle: true,
            circle: false,
            circlemarker: false,
        },
        edit: {
            featureGroup: drawnItems
        }
    });
    */
  }
}
