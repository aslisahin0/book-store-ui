import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookDto } from '../models/book-dto';
import { CreateBookDto } from '../models/book-create-dto';
import { UpdateBookDto } from '../models/book-update-dto';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:5092/api'; //Backend API adresi

  constructor(private http: HttpClient) {}

  getBooks(): Observable<{ data: BookDto[] }> {
  return this.http.get<{ data: BookDto[] }>(`${this.apiUrl}/Book/GetAll`);
}


getBookById(id: number): Observable<{ data: BookDto }> {
  return this.http.get<{ data: BookDto }>(`${this.apiUrl}/Book/GetById/${id}`);
}

addBook(book: CreateBookDto) {
  return this.http.post(`${this.apiUrl}/Book/Create`, book);
}

updateBook(id: number, book: UpdateBookDto): Observable<any> {
  return this.http.put(`${this.apiUrl}/Book/Update/${id}`, book);
}

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Book/Delete/${id}`);
  }
}

