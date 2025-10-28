import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegistrationComponent } from './pages/registration/registration';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { ProductsComponent } from './pages/products/products';
import { ProductFormComponent } from './pages/product-form/product-form';
import { OrderListComponent } from './pages/orders/orders';
import { OrderFormComponent } from './pages/order-form/order-form';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'product-form', component: ProductFormComponent, canActivate: [authGuard] },
  { path: 'product-form/:id', component: ProductFormComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrderListComponent, canActivate: [authGuard] },
  { path: 'order-form', component: OrderFormComponent, canActivate: [authGuard] },
  { path: 'order-form/:id', component: OrderFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' },
];
