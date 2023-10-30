import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuery = new Subject<string>();

  // Observable que otros componentes pueden observar para recibir notificaciones de cambios en la búsqueda.
  searchQuery$ = this.searchQuery.asObservable();

  setSearchQuery(query: string) {
    this.searchQuery.next(query);
  }
}
