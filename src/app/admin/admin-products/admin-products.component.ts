import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products$: any[] = [];
  filteredProducts!: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe((products: any[]) => {
        this.filteredProducts = this.products$ = products;

        // console.log(this.products$);
        // this.products$.forEach((product: any) => {
        //   console.log(product.key);
        //   console.log(product.category);
        //   console.log(product.imageUrl);
        //   console.log(product.price);
        //   console.log(product.title);
        // });

      });
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products$.filter((p: any) => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products$;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
