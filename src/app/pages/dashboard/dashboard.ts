import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../services/auth';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule,
    MatToolbar,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {

  constructor(private authService:AuthService) {}
  stats = {
    orders: 42,
    products: 18,
    users: 7,
  };

  latestProducts = [
    { id: 101, name: 'Smartphone X1', price: 699, createdAt: '2025-10-24' },
    { id: 102, name: 'Wireless Earbuds', price: 129, createdAt: '2025-10-23' },
    { id: 103, name: 'Laptop Pro 14"', price: 1299, createdAt: '2025-10-22' },
    { id: 104, name: 'Gaming Mouse', price: 79, createdAt: '2025-10-21' },
    { id: 105, name: 'Mechanical Keyboard', price: 149, createdAt: '2025-10-20' },
  ];

  latestOrders = [
    { id: 5001, customer: 'John Doe', total: 259.99, date: '2025-10-24' },
    { id: 5002, customer: 'Sarah Smith', total: 499.49, date: '2025-10-23' },
    { id: 5003, customer: 'Ahmed Ali', total: 89.0, date: '2025-10-22' },
    { id: 5004, customer: 'Maya Johnson', total: 999.99, date: '2025-10-21' },
    { id: 5005, customer: 'Carlos Lopez', total: 45.99, date: '2025-10-20' },
  ];

  displayedColumnsProducts = ['id', 'name', 'price', 'createdAt'];
  displayedColumnsOrders = ['id', 'customer', 'total', 'date'];

  ngOnInit() {}
  
  onLogout(){
    this.authService.logout();
  }
}
