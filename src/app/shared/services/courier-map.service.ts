/* eslint-disable @typescript-eslint/naming-convention */
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Socket } from 'ngx-socket-io';
declare var google;
import { CourierPosition } from '../types';

@Injectable({
  providedIn: 'root'
})

export class CourierMapService {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public courierPositions: CourierPosition[] = [];
  private mapOptions = {
    zoom: 15,
    center: null,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  constructor(
    private socket: Socket
  ) {
    this.socket.connect();
    this.getCourierPositions();
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
  async watchCourierPosition(courierId: any): Promise<any> {
      const watchId = Geolocation.watchPosition({}, (position, err) => {
        if (position) {
          const courerPosition: CourierPosition  = {courierId, watchId, lat:  position.coords.latitude, lng: position.coords.longitude};
          this.socket.emit('watch-courier-location', courerPosition);
        }
      });
  }
  getCourierPositions(): void{
    this.socket.fromEvent('get-courier-location')
      .subscribe((courierPositions: CourierPosition[]) =>{
        this.courierPositions = courierPositions;
      });
  }
  disconnectSocket(): void{
    this.socket.disconnect();
  }
  stopWatching(courierId: string) {//MAKE THIS WORK LATER
    this.socket.on('get-courier-location', (couriersPositions: CourierPosition[]) =>{
      const latestcourPosition = couriersPositions.find(postion => postion.courierId === courierId);
      Geolocation.clearWatch({ id: latestcourPosition.watchId }).then(() => {});
    });
  }
}
