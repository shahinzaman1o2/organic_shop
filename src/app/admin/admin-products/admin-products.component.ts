import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products$: Product[] = [];
  subscription: Subscription;
  dataSource!: MatTableDataSource<Product>;
  displayedColumns: string[] = ['title', 'price', 'edit'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.products$ = products;

        // console.log(this.products$);
        // this.products$.forEach((product: any) => {
        //   console.log(product.key);
        //   console.log(product.category);
        //   console.log(product.imageUrl);
        //   console.log(product.price);
        //   console.log(product.title);
        // });

        this.dataSource = new MatTableDataSource(products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  filter(query: string) {
    let filteredProducts = (query) ?
      this.products$.filter((p: any) => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products$;
    this.dataSource = new MatTableDataSource(filteredProducts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
