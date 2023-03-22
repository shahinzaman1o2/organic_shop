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

  constructor(
    private db: AngularFireDatabase,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      // console.log(params);
      if (id) {
        this.productService.get(id).subscribe(product => {
          if (product) {
            this.product = product;
          }
        });
      }
    });
    this.categories$ = this.db.list('/categories').valueChanges();
  }

  save(product: any) {
    this.productService.create(product);
    this.router.navigate(['/admin/products'])
  }
}

