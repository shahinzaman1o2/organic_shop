import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$!: Observable<any[]>;

  constructor(private db: AngularFireDatabase, private productService: ProductService) { }

  save(product: any) {
    this.productService.create(product);
  }

  ngOnInit(): void {
    this.categories$ = this.db.list('/categories').valueChanges();
  }

}
