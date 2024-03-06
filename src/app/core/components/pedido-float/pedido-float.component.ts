import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

import { Component, EventEmitter, Output } from '@angular/core';


import OpenAI from 'openai';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-pedido-float',
  templateUrl: './pedido-float.component.html',
  styleUrls: ['./pedido-float.component.scss', './floating.scss'],
})
export class PedidoFloatComponent {


  userMessage: string = '';
  chatHistory: any[] = [];
  floatingButtonState = 'normal';
  openaiInstance: OpenAI | undefined;

  message!: string;
  constructor(private tokenService: TokenService) {

  }
  async sendMessage() {


    this.userMessage = ''; // Limpia el mensaje del usuario después de enviar
  }

  @Output() chatOpened = new EventEmitter<boolean>();

  chatOpen = false; // Set to false by default

  toggleChat() {

  }
  getMessageTime(timestamp: number): string {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

}
