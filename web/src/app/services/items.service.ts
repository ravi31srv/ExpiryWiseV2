import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Item {
  _id?: string;
  item: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private apiUrl = environment.apiUrl;
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  public items$ = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadItems();
  }

  loadItems(): void {
    this.getItems().subscribe({
      next: (items) => this.itemsSubject.next(items),
      error: (error) => console.error('Error loading items:', error),
    });
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/items`);
  }

  addItem(item: Item): Observable<{ success: boolean; data: Item }> {
    return this.http.post<{ success: boolean; data: Item }>(`${this.apiUrl}/items`, item).pipe(
      tap((response) => {
        const currentItems = this.itemsSubject.value;
        this.itemsSubject.next([...currentItems, response.data].sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }));
      })
    );
  }

  deleteItem(itemId: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/items/${itemId}`).pipe(
      tap(() => {
        const currentItems = this.itemsSubject.value;
        const updatedItems = currentItems.filter((item) => item._id !== itemId);
        this.itemsSubject.next(updatedItems);
      })
    );
  }

  getCurrentItems(): Item[] {
    return this.itemsSubject.value;
  }
}
