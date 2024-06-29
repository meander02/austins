import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activate-count',
  templateUrl: './activate-count.component.html',
  styleUrls: ['./activate-count.component.scss']
})
export class ActivateCountComponent implements OnInit {
  token: string = '';
  password: string | undefined;
  error: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const token = params.get('token');
      if (token) {
        this.token = token;
      }
    });
  }

  activateAccount() {
    this.http.post<any>(`${environment.api}/auth/activate`, { token: this.token, password: this.password })
      .subscribe(
        () => {
          alert('¡Cuenta activada correctamente!');

          // Activación exitosa, redirigir o mostrar mensaje de éxito
        },
        error => {
          this.error = error.message || 'Error al activar la cuenta.';
          alert(this.error);

        }
      );
  }
}
