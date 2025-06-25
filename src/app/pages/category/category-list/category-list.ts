import { Component, OnInit } from '@angular/core';
import { CategoryDto } from '../../../models/category-dto';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.css']
})
export class CategoryList implements OnInit {

  displayedColumns = ['id', 'name', 'edit', 'delete'];
  categories: CategoryDto[] = [];

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (res) => this.categories = res.data,
      error: () => this.snackBar.open('Kategoriler yüklenemedi.', 'Kapat', { duration: 3000 })
    });
  }

  deleteCategory(id: number): void {
    this.categoryService.delete(id).subscribe(() => {
      this.snackBar.open('Kategori silindi.', 'Kapat', { duration: 3000 });
      this.loadCategories();
    });
  }
}
