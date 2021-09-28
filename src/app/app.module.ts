import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';
import { ManagingDialogComponent } from 'src/app/components/managing-dialog/managing-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectAllComponent } from 'src/app/components/select-all/select-all.component';
import { MatSortModule } from '@angular/material/sort';
import { GenericFormModule } from 'src/app/components/generic-form/generic-form.module';

@NgModule({
  declarations: [
    AppComponent,
    ComingSoonComponent,
    LoginComponent,
    DashboardComponent,
    ConfirmationComponent,
    ManagingDialogComponent,
    SelectAllComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    GenericFormModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
