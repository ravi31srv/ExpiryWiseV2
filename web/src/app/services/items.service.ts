import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Item {
  _id?: string;
  name: string;
  expiryDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private apiUrl = environment.apiUrl;
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  
  public items$ = this.itemsSubject.asObservable();
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadItems(): void {
    this.isLoadingSubject.next(true);
    this.getItems().subscribe({
      next: (items) => {
        this.itemsSubject.next(items);
        this.isLoadingSubject.next(false);
      },
      error: (error) => {
        console.error('Error loading items:', error);
        this.isLoadingSubject.next(false);
      },
    });
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/items`);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}/items`, item).pipe(
      tap((newItem) => {
        const currentItems = this.itemsSubject.value;
        this.itemsSubject.next([...currentItems, newItem].sort((a, b) => {
          return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
        }));
      })
    );
  }

  deleteItem(itemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/items/${itemId}`).pipe(
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
