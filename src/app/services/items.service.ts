import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IItem } from 'src/app/models/item.model';
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  let
  mockList: IItem[] = [
    {
      id: 2,
      code: '3211 FV',
      type: 'Business',
      shared: false,
      address: 'Harlemstraat 45',
    },
    {
      id: 3,
      code: '3321 FG',
      shared: true,
      type: 'Private',
      address: 'Breestraat 86A',
    },
    {
      id: 4,
      code: '1321 AS',
      shared: true,
      type: 'Govermantal',
      address: 'Koetswellstraat, 4',
    },
  ];

  constructor() {
  }


  getItemsList(): Observable<IItem[]> {
    // return this.apiService.get(``);
    return of(this.mockList)
      .pipe(delay(1000));
  }

  createItem(item: IItem): Observable<any> {
    // return this.apiService.post(``, item);
    item.id = this.mockList.length + this.getRandom();
    this.mockList.push(item);
    return of(item)
      .pipe(delay(1500));
  }

  getRandom(): number {
    return Math.floor((Math.random() * 10000) + 1);
  }

  editItem(item: IItem): Observable<IItem> {
    const initial = this.mockList.find(i => i.id === item.id);
    if (initial) {
      Object.assign(initial, item);
    }
    // return this.apiService.put(``, item);
    return of(initial);
  }

  deleteItem(item: IItem[]): Observable<any> {
    for (let i of item) {
      const index = this.mockList.indexOf(i);
      this.mockList.splice(index, 1);
    }

    // return this.apiService.delete(``);
    return of('success')
      .pipe(delay(1500));
  }

}
