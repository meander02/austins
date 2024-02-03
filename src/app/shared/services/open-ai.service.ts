// import { Injectable } from '@angular/core';
// import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';
// import { Observable, throwError } from 'rxjs';
// import { catchError, filter, map } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class OpenAiService {
//   private readonly configuration = new Configuration({
//     apiKey: environment.apikey,
//   });

//   private readonly openai = new OpenAIApi(this.configuration);

//   getDataFromOpenAI(text: string): Observable<string> {
//     const requestOptions: CreateCompletionRequest = {
//       model: 'text-davinci-003',
//       prompt: text,
//       max_tokens: 256,
//       temperature: 0.7,
//       // headers: {
//       //   Authorization: `Bearer ${environment.apikey}`,
//       // },
//     };

//     return this.openai.createCompletion(requestOptions).pipe(
//       filter((resp) => !!resp && !!resp.data),
//       map((resp) => resp.data),
//       filter(
//         (data: any) =>
//           data.choices && data.choices.length > 0 && data.choices[0].text
//       ),
//       map((data) => data.choices[0].text),
//       catchError((error) => {
//         console.error('Error fetching data from OpenAI:', error);
//         return throwError(error);
//       })
//     );
//   }
// }
