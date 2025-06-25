import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../../services/book.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BookDto } from '../../../../models/book-dto';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './book-details.html',
  styleUrls: ['./book-details.css']
})
export class BookDetails implements OnInit {
  book!: BookDto;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    public router: Router
  ) {}

    ngOnInit(): void {
  const id = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
  console.log('Detay Sayfası - Kitap ID:', id);

this.bookService.getBookById(id).subscribe({
  next: (data: { data: BookDto }) => {
    console.log('Gelen kitap:', data);
    this.book = data.data;
  },

});

}

}
