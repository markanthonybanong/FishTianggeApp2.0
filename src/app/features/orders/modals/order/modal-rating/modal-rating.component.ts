import { Component, Input, OnInit } from '@angular/core';
import { OrderDataService } from '@fish-tiangge/shared/data-service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-rating',
  templateUrl: './modal-rating.component.html',
  styleUrls: ['./modal-rating.component.scss'],
})
export class ModalRatingComponent implements OnInit {
  private starNumber = '2.5';
  private userComment = '';
  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {}
  dismissModal(): void{
    this.modalController.dismiss();
  }
  onRatingChange(rating){
  }
  onAdd(): void{
    this.modalController.dismiss({
      starNumber: this.starNumber,
      userComment: this.userComment
    });
  }
}
