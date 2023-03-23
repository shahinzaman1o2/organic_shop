import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  categories$: Observable<any[]>;
  product: Product = {};
  id: string | null = null;
  subscription!: Subscription;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.categories$ = categoryService.getAll();
  }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      // console.log(params);
      if (this.id) {
        this.productService.get(this.id).subscribe(product => {
          if (product) {
            this.product = product;
          }
        });
      }
    });
  }

  save(product: Product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products'])
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    if (this.id) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
