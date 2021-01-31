import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretComponent } from './secret.component';

import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { NgxSpinnerModule } from 'ngx-spinner';

import { FavoritListComponent } from './favorit-list/favorit-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SecretComponent,
    FavoritListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SecretComponent
      }
    ]),
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxSpinnerModule
  ]
})
export class SecretModule { }
