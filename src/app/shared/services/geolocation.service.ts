/* eslint-disable @typescript-eslint/naming-convention */
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
declare const google;
import { CourierPosition } from '../types';

@Injectable({
  providedIn: 'root'
})

export class GeolocationService {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public courierPositions: CourierPosition[] = [];
  private mapOptions = {
    zoom: 15,
    center: null,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  constructor() {
  }
  setMapElement(map: ElementRef): void {
    this.mapElement = map;
  }
  async loadMap(lat: number, lng: number): Promise<void> {
    const latLng           = new google.maps.LatLng(lat, lng);
    this.mapOptions.center = latLng;
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
    this.addMarker(latLng);
  }
  updateMapmarker(latitude: number, longitude: number): void {
    const latLng           = new google.maps.LatLng(latitude, longitude);
    this.mapOptions.center = latLng;
    this.addMarker(latLng);
  }
  addMarker(latLng: any): void {
    new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
  }
  async currentAddress(): Promise<any>{
    const coordinates = await Geolocation.getCurrentPosition();
    const geocoder    = new google.maps.Geocoder();
    const latLng      = {lat: coordinates.coords.latitude, lng: coordinates.coords.longitude};
    const result      = await geocoder.geocode({location: latLng});
    return {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
      address: result.results[0].formatted_address
    };
  }
}
