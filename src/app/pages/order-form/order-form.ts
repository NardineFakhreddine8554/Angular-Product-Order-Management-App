import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../services/product';
import { OrderService } from '../../services/order';
import { Product } from '../../models/product.model';
import { Order, OrderItem } from '../../models/order.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule,MatIcon],
  templateUrl: './order-form.html',
  styleUrls: ['./order-form.css']
})
export class OrderFormComponent implements OnInit {
  form!: FormGroup;
  orderId?: String;
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      customer: ['', Validators.required],
      items: this.fb.array([]),
      total: [{ value: 0, disabled: true }]
    });

    this.productService.getAll().subscribe(data => this.products = data);

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.orderId = idParam;
      this.orderService.getById(this.orderId).subscribe(order => this.loadOrder(order));
    }
  }

  get items() {
    return this.form.get('items') as FormArray;
  }

  addItem() {
    const item = this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [{ value: 0, disabled: true }],
      subtotal: [{ value: 0, disabled: true }]
    });
    this.items.push(item);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.updateTotal();
  }

  onProductChange(index: number) {
    const item = this.items.at(index);
    const product = this.products.find(p => p.id === item.get('productId')?.value);
    if (product) {
      item.patchValue({ price: product.price });
      this.updateSubtotal(index);
    }
  }

  updateSubtotal(index: number) {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('price')?.value || 0;
    item.patchValue({ subtotal: quantity * price });
    this.updateTotal();
  }

  updateTotal() {
    const total = this.items.controls.reduce((sum, item) => sum + (item.get('subtotal')?.value || 0), 0);
    this.form.patchValue({ total });
  }

  loadOrder(order: Order) {
    this.form.patchValue({ customer: order.customer, total: order.total });
    order.items.forEach(i => {
      const item = this.fb.group({
        productId: [i.productId],
        quantity: [i.quantity],
        price: [i.price],
        subtotal: [i.subtotal]
      });
      this.items.push(item);
    });
  }

  save() {
    if (this.form.invalid) return;

    const order: Order = {
      customer: this.form.value.customer,
      items: this.items.getRawValue(),
      total: this.form.get('total')?.value,
      date: new Date().toISOString()
    };

    if (this.orderId) {
      this.orderService.update(this.orderId, order).subscribe(() => this.router.navigate(['/orders']));
    } else {
      this.orderService.create(order).subscribe(() => this.router.navigate(['/orders']));
    }
  }

  cancel() {
    this.router.navigate(['/orders']);
  }
}
