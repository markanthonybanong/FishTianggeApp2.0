import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
 
@Injectable({
    providedIn: 'root'
 })
export class ImageService {

  constructor(
    private dom: DomSanitizer
  ) {}
  public safePhotoURL(imageURL: string): SafeUrl {
    return this.dom.bypassSecurityTrustUrl(imageURL);
  }
  async takePicture(): Promise<string> {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 10
    });
    return `data:image/${image.format};base64, ${image.base64String}`;
  }
  async loadFromLibrary(): Promise<string> {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      quality: 10
    });
    return `data:image/${image.format};base64, ${image.base64String}`;
  }
  setSafeUrlToBase64Img<T>(items: Array<T>, imgKey: string): Array<T> {
    items.forEach(item => {
      if ( item[imgKey] !== null) {
        item[imgKey] = this.safePhotoURL(item[imgKey]);
      }
    });
    return items;
  }
}
