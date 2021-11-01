import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 5,
    center: L.latLng({ lat: 38.991709, lng: -76.886109 }),
  };

  @Input()
  public set searchedPosition(position: any) {
    console.log(position);
  }

  ngOnInit() {
  }
}


