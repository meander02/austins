import { Component, EventEmitter, Output } from '@angular/core';
import { OpenAiService } from 'src/app/shared/services/open-ai.service';
// import { OpenAiService } from '../tu-ruta/open-ai.service'; // Asegúrate de proporcionar la ruta correcta

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  userMessage: string = '';
  chatHistory: any[] = [];

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

  toggleChat() {
    this.chatOpen = !this.chatOpen;
    this.chatOpened.emit(this.chatOpen);
  }
}
