import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
const { Geolocation } = Plugins;
declare var google;

@Injectable({
  providedIn: 'root'
})
export class CourierMapService {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public courPosition = [];
  private mapOptions = {
    zoom: 15,
    center: null,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
  constructor( private apiService: ApiService) {
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
    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
  }
  watchCourierPosition(): any {
    return Geolocation.watchPosition({}, (position, err) => {
      if (position) {
        this.courPosition = [];
        this.courPosition.push({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }
    });
  }
  stopWatching(watchId: any) {
    Geolocation.clearWatch({ id: watchId }).then(() => {});
  }

}
