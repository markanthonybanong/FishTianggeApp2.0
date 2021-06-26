import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
 
import { ActionResponseComponent } from '../pop-overs';

@Injectable({
  providedIn: 'root'
})

export class PopOverService {

  constructor(public popoverController: PopoverController) { }

  async showPopUp(msg: string): Promise<void> {
    const modal = await this.popoverController.create({
      component: ActionResponseComponent,
      componentProps: {
        msg: msg
      },
      cssClass: 'popover',
      backdropDismiss: false
    });
    await modal.present();
  }
}
