import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef | undefined;
  map: L.Map | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  error: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.getLocation();
  }

  ngAfterViewInit(): void {
    this.checkAndInitMap();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.checkAndInitMap();
        },
        (error) => {
          this.error = this.getErrorMessage(error);
        }
      );
    } else {
      this.error = 'Geolocation is not supported by this browser.';
    }
  }

  checkAndInitMap(): void {
    if (this.mapContainer && this.latitude !== undefined && this.longitude !== undefined) {
      this.initMap();
    } else {
      console.error("Map container or coordinates not available for map initialization.");
    }
  }

  initMap(): void {
    if (this.map) {
      this.map.remove();
    }

    this.map = L.map(this.mapContainer!.nativeElement).setView([this.latitude!, this.longitude!], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([this.latitude!, this.longitude!]).addTo(this.map)
      .bindPopup('You are here.')
      .openPopup();
  }

  getErrorMessage(error: GeolocationPositionError): string {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'User denied the request for Geolocation.';
      case error.POSITION_UNAVAILABLE:
        return 'Location information is unavailable.';
      case error.TIMEOUT:
        return 'The request to get user location timed out.';
      default:
        return 'An unknown error occurred.';
    }
  }
}
