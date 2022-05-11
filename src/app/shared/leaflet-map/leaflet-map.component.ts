import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';

@Component({
  selector: 'ngx-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit {
  @Input() geometry: object;
  options = {};
  geoObject = {};
  layers = [];
  fitBounds: any = null;

  public set searchedPosition(position: any) {
    console.log(position);
  }

  ngOnInit() {
    this.options = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18, minZoom: 3, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }),
      ],
      zoom: 5,
      center: L.latLng({ lat: 55.692864, lng: 12.599246 }),
    };

    if (this.geometry) {
      this.geoObject = L.geoJSON(this.geometry as geojson.GeoJsonObject);
      this.layers = [this.geoObject];
      this.fitBounds = L.geoJSON(this.geometry as geojson.GeoJsonObject).getBounds();
    }
  }

  constructor() { }

}
