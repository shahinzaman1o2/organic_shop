import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any) {
    console.log(product);
    const categoryName = product.category.name; // extract the category name
    product.category = categoryName; // assign the category name to a new property on the product object
    return this.db.list('/products').push(product);
  }

}
