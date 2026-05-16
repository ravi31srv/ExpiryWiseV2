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
  errorMessage: string | null = null;
  deletingItemId: string | null = null;

  constructor(public itemsService: ItemsService) {}

  get items$() {
    return this.itemsService.items$;
  }

  get isLoading$() {
    return this.itemsService.isLoading$;
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.errorMessage = null;
    this.itemsService.loadItems();
  }

  getExpiryStatus(date: string): 'expired' | 'expiring-soon' | 'safe' {
    const itemDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
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
    today.setHours(0, 0, 0, 0);
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
}
