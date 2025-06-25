# Book Store UI - Angular Frontend

Bu proje, .NET Core ile geliştirilen bir kitap satış sisteminin Angular tabanlı kullanıcı arayüzüdür. Kitap ve kategori yönetimi gibi temel işlemleri destekler.

Backend proje linki: https://github.com/aslisahin0/BookStoreDemo

---

## 🚀 Proje Özellikleri

- 📘 Kitap ekleme, listeleme, güncelleme ve silme işlemleri
- 🗂️ Kategori ekleme, listeleme ve düzenleme
- 🎨 Angular Material ile modern kullanıcı arayüzü
- 🔗 RESTful API ile HTTP servisleri üzerinden veri iletişimi

---

## 🛠️ Kurulum ve Çalıştırma Rehberi

### 1. Gereksinimler

- [Node.js (v18+)](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli):

```bash
npm install -g @angular/cli
```
### 2. Projeyi Klonla veya İndir
Git ile:
```bash
git clone <proje-url>
cd book-store-ui
```
Veya ZIP olarak indirip çıkarın.

### 3. Bağımlılıkları Yükle
```bash
npm install
```
Bu işlem, package.json içindeki bağımlılıkları indirerek node_modules klasörünü oluşturur.

### 4. Uygulamayı Başlat
```bash
ng serve
```
Tarayıcınızdan aşağıdaki adrese gidin:
```
http://localhost:4200
```

---

### 📦 Kullanılan Paketler ve Kütüphaneler
```
@angular/core	      Angular'ın temel modülü
@angular/forms	    Reactive & template form yönetimi
@angular/router	    Sayfa yönlendirme işlemleri
@angular/material   UI bileşenleri (kart, form, buton vs.)
rxjs	              Reactive veri akışı
zone.js	            Angular değişim takibi
```
Ek olarak kullanılan bazı Angular Material modülleri:
MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule

---

### 📁 Proje Klasör Yapısı

book-store-ui/
│
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── book/
│   │   │   │   ├── book-add/         → Kitap ekleme sayfası
│   │   │   │   ├── book-edit/        → Kitap düzenleme sayfası
│   │   │   │   ├── book-list/        → Kitap listeleme sayfası
│   │   │   ├── category/
│   │   │   │   ├── category-add/     → Kategori ekleme
│   │   │   │   ├── category-edit/    → Kategori düzenleme
│   │   │   │   ├── category-list/    → Kategori listeleme
│   │   ├── services/
│   │   │   ├── book.service.ts       → Kitap servisleri
│   │   │   └── category.service.ts   → Kategori servisleri
│   │   ├── models/
│   │   │   ├── book-dto.ts
│   │   │   ├── book-create-dto.ts
│   │   │   ├── book-update-dto.ts
│   │   │   ├── category-dto.ts
│   │   │   ├── category-create-dto.ts
│   │   │   ├── category-update-dto.ts
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md

---

### 🔌 API Bağlantısı
API adresi doğrudan servis dosyalarında (book.service.ts, category.service.ts) aşağıdaki gibi tanımlanmıştır:
```
private apiUrl = 'http://localhost:5092/api';
```
Backend api adresinize göre bu satırı güncelleyebilirsiniz.

---

### 🧩 Backend ile Uyumlu Çalışma
Bu frontend arayüz, aşağıdaki özellikleri içeren .NET Core tabanlı bir API ile entegre çalışmaktadır:

Kitap ve kategori CRUD işlemleri
Repository Pattern & DTO kullanımı
AutoMapper ile veri dönüştürme
JWT Authorization
Swagger UI ile API dokümantasyonu

