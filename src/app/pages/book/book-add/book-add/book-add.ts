import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../../../services/book.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateBookDto } from '../../../../models/book-create-dto';
import { CategoryService } from '../../../../services/category.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CategoryDto } from '../../../../models/category-dto';


@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule, MatOptionModule],
  templateUrl: './book-add.html',
  styleUrls: ['./book-add.css']
})
export class BookAdd {
  bookForm: FormGroup;
  categories: CategoryDto[] = [];

  constructor(private fb: FormBuilder, private bookService: BookService,  private categoryService: CategoryService, public router: Router, private snackBar: MatSnackBar) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      categoryId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: [0, Validators.required],
      categoryId: [null, Validators.required],
    });

    this.categoryService.getCategories().subscribe((res: any) => {
  this.categories = res.data;
    });
  }


onSubmit() {
  if (this.bookForm.valid) {
    const newBook: CreateBookDto = this.bookForm.value;

    this.bookService.addBook(newBook).subscribe({
      next: () => {
        this.snackBar.open('Kitap başarıyla eklendi!', 'Kapat', { duration: 3000 });
        this.bookForm.reset();
        this.router.navigate(['/book']);
      },
      error: (err) => {
        console.error('Kitap ekleme hatası:', err);
        this.snackBar.open('Kitap eklenirken bir hata oluştu.', 'Kapat', { duration: 3000 });
      }
    });
  }
}

}
