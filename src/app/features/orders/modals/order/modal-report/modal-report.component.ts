import { Component, OnInit } from '@angular/core';
import { OrderDataService } from '@fish-tiangge/shared/data-service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-report',
  templateUrl: './modal-report.component.html',
  styleUrls: ['./modal-report.component.scss'],
})
export class ModalReportComponent implements OnInit {
  comment = '';
  constructor(
    private modalController: ModalController,
    public orderDataService: OrderDataService
  ) { }

  ngOnInit() {}
  dismissModal(): void{
    this.modalController.dismiss();
  }
  onAdd(): void{
    this.modalController.dismiss({
      comment: this.comment
    });
  }
}
