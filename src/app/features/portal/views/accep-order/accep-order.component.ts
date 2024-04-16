import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accep-order',
  templateUrl: './accep-order.component.html',
  styleUrls: ['./accep-order.component.scss']
})
export class AccepOrderComponent implements OnInit {
  SEMUYI: string = "";

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // Obtener el parámetro SEMUYI de la URL
    this.route.queryParams.subscribe(params => {
      this.SEMUYI = params['SEMUYI'];
      // Realizar la consulta con el código SEMUYI
      this.consultarCodigo(this.SEMUYI);
    });
  }

  consultarCodigo(SEMUYI: string) {
    // Realizar la consulta HTTP con el código SEMUYI
    // this.http.get(`/publicR?code=${SEMUYI}`).subscribe(
    //   (response: any) => {
    //     console.log('Respuesta de la consulta:', response);
    //     // Aquí puedes manejar la respuesta según sea necesario
    //   },
    //   (error) => {
    //     console.error('Error al realizar la consulta:', error);
    //     // Aquí puedes manejar los errores según sea necesario
    //   }
    // );
  }
}
