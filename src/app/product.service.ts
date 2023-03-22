import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any) {
    // console.log(product);
    const categoryName = product.category; // extract the category name
    // console.log(categoryName);
    product.category = categoryName; // assign the category name to a new property on the product object
    // console.log(categoryName);
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list<any>('/products').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  get(productId: string): Observable<Product | null> {
    return this.db.object<Product>('/products/' + productId)
      .snapshotChanges()
      .pipe(
        map(changes => {
          if (changes.payload.exists()) {
            const data = changes.payload.val();
            const key = changes.payload.key;
            return { key, ...data };
          } else {
            return null;
          }
        })
      );
  }

  update(productId: string, product: Product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }
}

