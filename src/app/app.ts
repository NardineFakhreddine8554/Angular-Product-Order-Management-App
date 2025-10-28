import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './pages/login/login';
import { ProductsComponent } from './pages/products/products';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce');
}
