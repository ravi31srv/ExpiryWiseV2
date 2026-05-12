import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService, Item } from '../../services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent implements OnInit {
  form!: FormGroup;
  isSubmitting = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      item: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      date: ['', Validators.required],
    });
  }

  get itemControl() {
    return this.form.get('item');
  }

  get dateControl() {
    return this.form.get('date');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    const itemData: Item = {
      item: this.form.value.item.trim(),
      date: this.form.value.date,
    };

    this.itemsService.addItem(itemData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = `"${itemData.item}" added successfully!`;
        this.form.reset();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.error?.error || 'Failed to add item. Please try again.';
        console.error('Error adding item:', error);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}
