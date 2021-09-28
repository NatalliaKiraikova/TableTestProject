import { GenericFormComponent } from './generic-form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFieldDirective } from 'src/app/components/generic-form/dynamic-field/dynamic-field.directive';
import { ButtonComponent } from 'src/app/components/generic-form/button/button.component';
import { CheckboxComponent } from 'src/app/components/generic-form/checkbox/checkbox.component';
import { InputComponent } from 'src/app/components/generic-form/input/input.component';
import { LabelComponent } from 'src/app/components/generic-form/label/label.component';
import { SelectComponent } from 'src/app/components/generic-form/select/select.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectCheckAllComponent } from "src/app/components/generic-form/select/select-check-all.component";

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  declarations: [
    GenericFormComponent,
    DynamicFieldDirective,
    ButtonComponent,
    CheckboxComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    SelectCheckAllComponent
  ],
  exports: [
    GenericFormComponent,
  ]
})
export class GenericFormModule {
}
