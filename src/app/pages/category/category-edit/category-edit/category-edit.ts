import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { UpdateCategoryDto } from '../../../../models/category-update-dto';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './category-edit.html',
  styleUrls: ['./category-edit.css']
})
export class CategoryEdit implements OnInit {
  form!: FormGroup;
  categoryId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      name: ['', Validators.required]
    });

    this.categoryService.getById(this.categoryId).subscribe({
      next: (res) => {
        this.form.patchValue(res.data);
      },
      error: () => {
        this.snackBar.open('Kategori bulunamadı.', 'Kapat', { duration: 3000 });
        this.router.navigate(['/category']);
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updated: UpdateCategoryDto = this.form.value;

      this.categoryService.update(this.categoryId, updated).subscribe({
        next: () => {
          this.snackBar.open('Kategori güncellendi.', 'Kapat', { duration: 3000 });
          this.router.navigate(['/category']);
        },
        error: () => {
          this.snackBar.open('Güncelleme hatası oluştu.', 'Kapat', { duration: 3000 });
        }
      });
    }
  }
}
