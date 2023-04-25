import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  
  @ViewChild('map') mapElement: any;
  map!: L.Map;
  tempAtual: any;
  main!: any;

  constructor(private homeService: HomeService, private http: HttpClient) { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    const map = L.map('map').setView([51.5, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1
    }).addTo(map);
  }

  getAllInformations() {
    let search = (document.getElementById('search-field') as HTMLInputElement).value

    this.homeService.getAllInformations(search).subscribe({
      next: (data: any) => {
        this.main = data.main;
      },
      error: (error) => {
        console.log(error)
      }
    })
    this.getGeoLocation(search.replace(/\s/g, ''));
  }

  getGeoLocation(city: any) {
    this.homeService.getGeoLocation(city).subscribe({
      next: (data: any) => {
        console.log(data.results[0].geometry.location);
        let lat = data.results[0].geometry.location.lat;
        let lng = data.results[0].geometry.location.lng;
        L.map('map').panTo(new L.LatLng(lat, lng))
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
