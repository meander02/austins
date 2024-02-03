import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { HttpHeaders } from '@angular/common/http';

import { Component, EventEmitter, Output } from '@angular/core';

import { environment } from 'src/environments/environment';
import OpenAI from 'openai';

// const openai = new OpenAI();
let API='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'
const openai = new OpenAI({
  apiKey: API,
  dangerouslyAllowBrowser: true,
});

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss', './floating.scss'],
  animations: [
    trigger('dialogFadeInOut', [
      state('void', style({ transform: 'scale(0)', opacity: 0 })),
      transition(':enter', [
        animate(
          '1000ms ease-in',
          style({
            transform: 'scale(1)',
            opacity: 1,
            scroll: -10,
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
      state(
        'attention',
        style({
          animation: '2s infinite alternate attention',
        })
      ),
    ]),
  ],
})
export class ChatComponent {
  userMessage: string = '';
  chatHistory: any[] = [];
  floatingButtonState = 'normal';

  message!: string;
  constructor() {

  }

  async sendMessage() {
    if (this.userMessage.trim() === '') {
      return; // Evitar enviar mensajes vacíos
    }
  
    const userMessage = { role: 'user', content: this.userMessage.trim() };
    this.chatHistory.push(userMessage);
  

    const prompt = `[
      { "role": "system", "content": "Eres un asistente de Austins. Sé amable, contexta amablemente y  da la bienvenida. " },
      { "role": "system", "content": "Austins Repostería es una pastelería artesanal dedicada a deleitar los paladares con exquisitos postres y pasteles. Nuestra pasión por la repostería se refleja en cada creación, desde su concepción hasta su presentación en tu mesa." },
      { "role": "system", "content": "La dirección de Austins Repostería es Avenida Profr. Toribio Reyes 5, Huejutla, Hidalgo, México." },
      { "role": "system", "content": "Horario de atención: Abierto de lunes a domingo de 8 am a 8:30 pm." },
      { "role": "system", "content": "Teléfono: 01 789 896 4530." },
      { "role": "system", "content": "Correo electrónico: info@austins.com.mx." },
      { "role": "system", "content": "Para hacer un pedido en nuestro sitio web, sigue estos pasos:\\n1. Visita nuestro sitio web en austins.vercel.app.\\n2. Explora nuestro menú y selecciona los productos que deseas agregar al carrito.\\n3. Ve al carrito y revisa tu selección.\\n4. Procede al pago y sigue las instrucciones para completar tu pedido." },
      { "role": "user", "content": "${this.userMessage}" }
    ]`;
  
    try {
      const response = await openai.chat.completions.create({
        // messages: conversation,
        messages: JSON.parse(prompt),
        model: 'gpt-3.5-turbo',
      });
  
      // console.log(response);
  
      if (response?.choices?.length > 0) {
        const assistantResponse = response.choices[0].message.content;
        this.chatHistory.push({ role: 'assistant', content: assistantResponse });
      } else {
        console.error('Unexpected OpenAI response:', response);
      }
    } catch (error) {
      console.error('Error sending message to OpenAI:', error);
    }
  
    this.userMessage = ''; // Limpia el mensaje del usuario después de enviar
  }
  
  @Output() chatOpened = new EventEmitter<boolean>();

  chatOpen = false; // Set to false by default

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
