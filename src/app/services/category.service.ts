import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDto } from '../models/category-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:5092/api/Category'; //Backend API adresi

  constructor(private http: HttpClient) {}

  getCategories(): Observable<{ data: CategoryDto[] }> {
    return this.http.get<{ data: CategoryDto[] }>(`${this.apiUrl}/GetAll`);
  }

  getById(id: number): Observable<{ data: CategoryDto }> {
    return this.http.get<{ data: CategoryDto }>(`${this.apiUrl}/GetById/${id}`);
  }

  create(category: { name: string }) {
    return this.http.post(`${this.apiUrl}/Create`, category);
  }

  update(id: number, category: { name: string }) {
    return this.http.put(`${this.apiUrl}/Update/${id}`, category);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/Delete/${id}`);
  }
}
