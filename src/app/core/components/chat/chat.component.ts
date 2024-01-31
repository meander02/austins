import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

import { Component, EventEmitter, Output } from '@angular/core';
import { OpenAiService } from 'src/app/shared/services/open-ai.service';
// import { OpenAiService } from '../tu-ruta/open-ai.service'; // Asegúrate de proporcionar la ruta correcta

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],  
  animations: [
    trigger('dialogFadeInOut', [
      state('void',
      style({ transform: 'scale(0)', opacity: 0 }
      )
      ),
      transition(':enter', [
        animate(
          '1000ms ease-in',
          style({
            transform: 'scale(1)',
            opacity: 1,
            scroll :-10,
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '1000ms ease-out',
          style({ transform: 'scale(0.5)', opacity: 0 })
        ),
      ]),
    ]),  
    trigger('floatingButtonAttention', [
      state('normal', style({})),
      state('attention', style({
        animation: '2s infinite alternate attention',
      })),
    ]),
  ],

})
export class ChatComponent {
  userMessage: string = '';
  chatHistory: any[] = [];
  // Agrega una variable para controlar el estado del botón flotante
  floatingButtonState = 'normal';
  constructor(private openAiService: OpenAiService) {}

  sendMessage() {
    if (this.userMessage.trim() === '') {
      return; // Evitar enviar mensajes vacíos
    }

    this.chatHistory.push({ role: 'user', content: this.userMessage });

    this.openAiService.sendMessage(this.userMessage).subscribe(response => {
      const assistantReply = response.choices[0]?.message?.content || 'Lo siento, no entendí.';
      this.chatHistory.push({ role: 'assistant', content: assistantReply });
    });

    this.userMessage = ''; // Limpiar el campo de entrada después de enviar el mensaje
  }
  @Output() chatOpened = new EventEmitter<boolean>();

  // ... Resto del código del componente


  chatOpen = false; // Set to false by default

  // toggleChat() {
  //   this.chatOpen = !this.chatOpen;
  //   this.chatOpened.emit(this.chatOpen);
  // }


  toggleChat() {
    this.chatOpen = !this.chatOpen;
    // Cambia el estado del botón flotante al abrir el chat
    this.floatingButtonState = this.chatOpen ? 'attention' : 'normal';

    // Restablece el estado del botón flotante después de unos segundos (puedes ajustar el tiempo)
    if (this.chatOpen) {
      setTimeout(() => {
        this.floatingButtonState = 'normal';
      }, 3000); // Cambia a 'normal' después de 3 segundos
    }
  }

}
