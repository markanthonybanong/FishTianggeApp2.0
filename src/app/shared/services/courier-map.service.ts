/* eslint-disable @typescript-eslint/naming-convention */
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
declare var google;
import { io } from 'socket.io-client';
import { APP_CONFIG } from 'src/app/app.config';
import { CourierPosition } from '../types';

@Injectable({
  providedIn: 'root'
})

export class CourierMapService {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  private mapOptions = {
    zoom: 15,
    center: null,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  private socket = io(APP_CONFIG.apiUrl);

  constructor() {
    this.socket.on('connect', () =>{
    });
  }
  setMapElement(map: ElementRef): void {
    this.mapElement = map;
  }
  async loadMap(): Promise<void> {
    const position         = await Geolocation.getCurrentPosition();
    const latLng           = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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
  async watchCourierPosition(courierId:any): Promise<any> {
      const watchId = Geolocation.watchPosition({}, (position, err) => {
        if (position) {
          const courerPosition: CourierPosition  = {courierId, watchId, lat:  position.coords.latitude, lng: position.coords.longitude};
          this.socket.emit('watch-courier-location', courerPosition);
          console.log('emitting value cour');
          
        }
      });
  }
  stopWatching(courierId: string) {//MAKE THIS WORK LATER
    this.socket.on('get-courier-location', (couriersPositions: CourierPosition[]) =>{
      const latestcourPosition = couriersPositions.find(postion => postion.courierId === courierId);
      Geolocation.clearWatch({ id: latestcourPosition.watchId }).then(() => {});
    });
  }
}
