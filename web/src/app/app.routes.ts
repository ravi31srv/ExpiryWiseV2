import { Route } from '@angular/router';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { AddItemComponent } from './components/add-item/add-item.component';

export const appRoutes: Route[] = [
  { path: '', component: ItemsListComponent },
  { path: 'add', component: AddItemComponent },
  { path: '**', redirectTo: '' },
];
