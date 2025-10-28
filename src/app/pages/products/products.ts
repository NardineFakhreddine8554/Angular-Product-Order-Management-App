import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
// import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog';
import {  RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule
  ]

})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  displayedColumns = ['id', 'name', 'price', 'actions'];

  constructor(
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe(data => (this.products = data));
  }

  addProduct() {
    this.router.navigate(['/product-form']);
  }

  editProduct(id: number) {
    this.router.navigate(['/product-form', id]);
  }

  deleteProduct(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this product?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.delete(String(id)).subscribe(() => this.loadProducts());
      }
    });
  }
}
