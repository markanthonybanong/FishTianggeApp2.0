import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ImageService } from '@fish-tiangge/shared/services';
import { Store } from '@fish-tiannge/shared/types';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-store-information',
  templateUrl: './modal-store-information.component.html',
  styleUrls: ['./modal-store-information.component.scss'],
})
export class ModalStoreInformationComponent implements OnInit {
  @Input() store: Store;
  constructor(private modalController: ModalController, private imageService: ImageService) { }

  ngOnInit() {
  }
  dismissModal(): void {
    this.modalController.dismiss();
  }
}
