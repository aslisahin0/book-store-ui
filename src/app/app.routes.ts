import { Routes } from '@angular/router';
import { BookList } from './pages/book/book-list/book-list/book-list';
import { BookAdd } from './pages/book/book-add/book-add/book-add';
import { BookEdit } from './pages/book/book-edit/book-edit/book-edit';
import { BookDetails } from './pages/book/book-details/book-details/book-details';
import { CategoryAdd } from './pages/category/category-add/category-add/category-add';
import { CategoryEdit } from './pages/category/category-edit/category-edit/category-edit';

export const routes: Routes = [
  { path: 'book', component: BookList },
  { path: 'book/add', component: BookAdd },
  { path: 'book/edit/:id', component: BookEdit },
  { path: 'book/details/:id', component: BookDetails },
  {
    path: 'category',
    loadComponent: () =>
      import('./pages/category/category-list/category-list').then(
        (m) => m.CategoryList
      )
  },
   {path: 'category/add', component: CategoryAdd },
   {path: 'category/edit/:id', component: CategoryEdit },
  { path: '', redirectTo: '/book', pathMatch: 'full' }
];

