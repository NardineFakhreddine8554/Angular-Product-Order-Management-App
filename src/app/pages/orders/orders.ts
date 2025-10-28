import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../services/order';
import { Order } from '../../models/order.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatCard, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule,MatToolbar,RouterLink,MatCard,MatCardTitle],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class OrderListComponent implements OnInit {
  displayedColumns = ['id', 'customer', 'total', 'date', 'actions'];
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAll().subscribe(data => this.orders = data);
  }

  addOrder() {
    this.router.navigate(['/order-form']);
  }

  editOrder(order: Order) {
    this.router.navigate(['/order-form', order.id]);
  }

  deleteOrder(order: Order) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Delete order #${order.id}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.delete(String(order.id)!).subscribe(() => this.loadOrders());
      }
    });
  }
}
