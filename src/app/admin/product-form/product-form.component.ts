import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$!: Observable<any[]>;
  product: Product = {};
  id: string | null = null;

  constructor(
    private db: AngularFireDatabase,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
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
    this.categories$ = this.db.list('/categories').valueChanges();
  }

  save(product: any) {
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
}

