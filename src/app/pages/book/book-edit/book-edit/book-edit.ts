import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../../services/book.service';
import { BookDto } from '../../../../models/book-dto';
import { UpdateBookDto } from '../../../../models/book-update-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CategoryService } from '../../../../services/category.service';
import { CategoryDto } from '../../../../models/category-dto';


@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './book-edit.html',
  styleUrls: ['./book-edit.css']
})
export class BookEdit implements OnInit {
  form!: FormGroup;
  bookId!: number;
  categories: CategoryDto[] = [];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private bookService: BookService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  this.bookId = Number(this.route.snapshot.paramMap.get('id'));

  this.bookService.getBookById(this.bookId).subscribe({
    next: (res) => {
      const book: BookDto = res.data;

      this.form = this.fb.group({
        title: [book.title, Validators.required],
        author: [book.author, Validators.required],
        price: [book.price, [Validators.required, Validators.min(0)]],
        categoryId: [book.categoryId, Validators.required]
      });
    },
    error: () => {
      this.snackBar.open('Kitap bulunamadı.', 'Kapat', { duration: 3000 });
      this.router.navigate(['/book']);
    }
  });

  this.categoryService.getCategories().subscribe((res: any) => {
    this.categories = res.data;
  });
}

  onSubmit(): void {
    if (this.form.valid) {
      const updatedBook: UpdateBookDto = this.form.value;

      this.bookService.updateBook(this.bookId, updatedBook).subscribe({
        next: () => {
          this.snackBar.open('Kitap başarıyla güncellendi!', 'Kapat', { duration: 3000 });
          this.router.navigate(['/book']);
        },
        error: () => {
          this.snackBar.open('Güncelleme sırasında hata oluştu.', 'Kapat', { duration: 3000 });
        }
      });
    }
  }
}
