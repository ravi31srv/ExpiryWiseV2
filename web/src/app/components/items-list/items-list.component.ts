import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss',
})
export class ItemsListComponent implements OnInit {
  isLoading = false;
  errorMessage: string | null = null;
  Math = Math;
  deletingItemId: string | null = null;

  constructor(public itemsService: ItemsService) {}

  get items$() {
    return this.itemsService.items$;
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.isLoading = true;

    this.errorMessage = null;
    this.itemsService.loadItems();
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

//   loadItems(): void {
//   this.isLoading = true;

//   this.itemsService.getItems().subscribe({
//     next: (data: any) => {
//       this.items = data;
//     },

//     error: (error: any) => {
//       this.errorMessage = 'Failed to load items';
//     },

//     complete: () => {
//       this.isLoading = false;
//     }
//   });
// }

  getExpiryStatus(date: string): 'expired' | 'expiring-soon' | 'safe' {
    const itemDate = new Date(date);
    const today = new Date();
    const daysUntilExpiry = Math.ceil(
      (itemDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilExpiry < 0) {
      return 'expired';
    } else if (daysUntilExpiry <= 7) {
      return 'expiring-soon';
    } else {
      return 'safe';
    }
  }

  getDaysRemaining(date: string): number {
    const itemDate = new Date(date);
    const today = new Date();
    return Math.ceil(
      (itemDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  getStatusLabel(status: 'expired' | 'expiring-soon' | 'safe'): string {
    switch (status) {
      case 'expired':
        return 'EXPIRED';
      case 'expiring-soon':
        return 'EXPIRING SOON';
      default:
        return 'SAFE';
    }
  }

  deleteItem(itemId: string | undefined): void {
    if (!itemId || !confirm('Are you sure you want to delete this item?')) {
      return;
    }

    this.deletingItemId = itemId;
    this.itemsService.deleteItem(itemId).subscribe({
      next: () => {
        this.deletingItemId = null;
      },
      error: (error) => {
        this.deletingItemId = null;
        this.errorMessage = 'Failed to delete item. Please try again.';
        console.error('Error deleting item:', error);
      },
    });
  }

  addItemToList(newItem: any): void {
    this.itemsService.addItem(newItem).subscribe(() => {
      const itemElement = document.querySelector(`.item-card[data-id="${newItem.id}"]`);
      if (itemElement) {
        itemElement.classList.add('added');
        setTimeout(() => {
          itemElement.classList.remove('added');
        }, 800); // Match animation duration
      }
    });
  }
}
