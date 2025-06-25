import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { BookDto } from '../../../../models/book-dto';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css']
})
export class BookList implements OnInit {
  books: BookDto[] = [];
  displayedColumns = ['title', 'author', 'price', 'categoryName','details', 'edit', 'delete'];

  constructor(private bookService: BookService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
  this.bookService.getBooks().subscribe({
    next: (res) => this.books = res.data,
    error: () => this.snackBar.open('Kitaplar yüklenemedi.', 'Kapat', { duration: 3000 })
  });
}

   deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.snackBar.open('Kitap başarıyla silindi.', 'Kapat', { duration: 3000 });
      this.loadBooks();
    });
  }
}
