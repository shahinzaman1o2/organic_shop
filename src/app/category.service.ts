import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<any[]> {
    return this.db.list('/categories')
      .snapshotChanges()
      .pipe(
        map((changes: SnapshotAction<any>[]) => changes.map((
          c: SnapshotAction<any>) => ({
            key: c.payload.key, name: c.payload.val().name
          })))
      );
  }

}
