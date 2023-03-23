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
    // console.log(product.category);
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

