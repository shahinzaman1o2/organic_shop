import { Component } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  products$;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll();

    // console.log(this.products$);
    // this.products$.subscribe(data => console.log(data));

    // this.products$.subscribe(products => {
    //   products.forEach(product => {
    //     const key = product.key;
    //     const data = product.payload ? product.payload.val() : null;
    //     console.log(key, data);
    //   });
    // });

  }
}
