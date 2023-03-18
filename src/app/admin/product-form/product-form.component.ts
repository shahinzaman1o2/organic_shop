import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$!: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.categories$ = this.db.list('/categories').valueChanges();
  }

}
