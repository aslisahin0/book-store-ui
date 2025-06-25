import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { CreateCategoryDto } from '../../../../models/category-create-dto';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './category-add.html',
  styleUrls: ['./category-add.css']
})
export class CategoryAdd {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    public router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newCategory: CreateCategoryDto = this.form.value;

      this.categoryService.create(newCategory).subscribe({
        next: () => {
          this.snackBar.open('Kategori başarıyla eklendi!', 'Kapat', { duration: 3000 });
          this.router.navigate(['/category']);
        },
        error: () => {
          this.snackBar.open('Kategori eklenirken hata oluştu.', 'Kapat', { duration: 3000 });
        }
      });
    }
  }
}
