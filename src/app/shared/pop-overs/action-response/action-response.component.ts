import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-action-response',
  templateUrl: './action-response.component.html',
  styleUrls: ['./action-response.component.scss'],
})
export class ActionResponseComponent implements OnInit {
  @Input() msg: string;
  constructor(
   public popoverController: PopoverController
  ) { }

  ngOnInit() {}

  onOk(): void {
    this.popoverController.dismiss();
  }
}
