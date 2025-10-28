import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductService } from '../../services/product';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule,RouterLink,
    RouterLinkActive,
    RouterOutlet, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  productId?: String;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      description: ['']
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      console.log(idParam)
      if (idParam) {    
        this.productId=idParam               // only convert if id exists
        this.productService.getById(idParam).subscribe(p => {
          if (p) this.form.patchValue(p);
        });
      }
    });
  }

  save() {
    if (this.form.invalid) return;

    const product = this.form.value;

    if (this.productId) {
      this.productService.update(this.productId, product).subscribe(() => this.router.navigate(['/products']));
      
    } else {
      this.productService.create(product).subscribe(() => this.router.navigate(['/products']));
    }
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
