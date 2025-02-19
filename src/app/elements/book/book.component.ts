import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Book } from './book.model';
import { List } from '../list/list.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: Book;

  public lists: Observable<List[]>; // Matt(2019/06/06):Needs to be public

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.lists = this.afs.collection<List>(this.book.uid).valueChanges();
  }

  add() {
    const name = window.prompt('enter name');
    if (!name) {
      return;
    }

    const uid = this.afs.createId();
    this.afs.collection<List>(this.book.uid).doc(uid).set(
      {
        uid,
        name,
        description: uid
      }
    );
  }
}
