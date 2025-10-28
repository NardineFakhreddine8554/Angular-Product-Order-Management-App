import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  getById(id: String): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API_URL, product);
  }

  update(id: String, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/${id}`, product);
  }

  delete(id: String): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
