import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/category`)
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud:', error);
          return throwError(error);
        })
      );
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.api}/category/${id}`);
  }

  createCategory(categoryData: any): Observable<any> {
    return this.http.post<any>(`${environment.api}/category`, categoryData);
  }

  updateCategory(id: string, categoryData: any): Observable<any> {
    return this.http.put<any>(`${environment.api}/category/${id}`, categoryData);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.api}/category/${id}`);
  }

  getMainCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/category/main/list`);
  }

  getAllCategoriesPaginate(limit: number, skip: number): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/category/page/${limit}/${skip}`, {});
  }
}
