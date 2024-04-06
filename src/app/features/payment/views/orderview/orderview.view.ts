import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-orderview',
  templateUrl: './orderview.view.html',
  styleUrl: './orderview.view.scss',
  providers: [DialogService, ConfirmationService, MessageService],
})
export class OrderviewView {

}
