// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError, from } from 'rxjs';
// import { catchError, delay, mergeMap, toArray } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class OpenAiService {
//   private apiKey = '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';
//   private lastApiCallTimestamp: number = 0;
//   private minTimeBetweenCalls: number = 2000; // Adjust the delay to a higher value (in milliseconds)
//   private maxTokensPerCall: number = 4096; // Adjust as per OpenAI API limit

//   constructor(private http: HttpClient) {}

//   private countTokens(message: string): number {
//     // Implement your logic to count tokens in the message
//     // This can be based on spaces, punctuation, or using OpenAI's `tiktoken` library
//     // For simplicity, we assume one token per word here
//     return message.split(' ').length;
//   }

//   private splitMessage(message: string): string[] {
//     // Split the message into chunks of tokens to fit within the limit
//     const tokens = message.split(' ');
//     const chunks: string[] = [];

//     for (let i = 0; i < tokens.length; i += this.maxTokensPerCall) {
//       const chunk = tokens.slice(i, i + this.maxTokensPerCall).join(' ');
//       chunks.push(chunk);
//     }

//     return chunks;
//   }

//   sendMessage(userMessage: string): Observable<any> {
//     const currentTime = Date.now();
//     const timeSinceLastCall = currentTime - this.lastApiCallTimestamp;

//     if (timeSinceLastCall < this.minTimeBetweenCalls) {
//       const delayTime = this.minTimeBetweenCalls - timeSinceLastCall;
//       return throwError(`Throttling. Please wait for ${delayTime} milliseconds before making another request.`);
//     }

//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${this.apiKey}`,
//     });

//     const systemMessage = { role: 'assistant', content: 'You are a helpful assistant.' };
//     const userMessages = this.splitMessage(userMessage).map(content => ({ role: 'user', content }));
//     console.log(userMessages)
//     // messages=[
//     //   {"role": "system", "content": "You are a helpful assistant."},
//     //   {"role": "user", "content": "Who won the world series in 2020?"},
//     //   {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
//     //   {"role": "user", "content": "Where was it played?"}
//     // ]
//     const data = {
//       model: 'gpt-3.5-turbo',
//       messages: [systemMessage, ...userMessages],
//     };

//     return from(data.messages).pipe(
//       mergeMap(message => {
//         const tokens = this.countTokens(message.content);

//         // Introduce a delay only if there are tokens in the message
//         const delayTime = tokens > 0 ? this.minTimeBetweenCalls : 0;

//         return this.http.post('https://api.openai.com/v1/chat/completions', { model: data.model, messages: [message] }, { headers }).pipe(
//           catchError(this.handleError),
//           delay(delayTime),
//         );
//       }),
//       toArray(),
//     );
//   }

//   private handleError(error: HttpErrorResponse): Observable<never> {
//     console.error('Error from OpenAI API:', error);

//     if (error.status === 429) {
//       return throwError('Rate limit exceeded. Please reduce the token count or implement throttling.');
//     }

//     return throwError('Error occurred during API request');
//   }
// }
