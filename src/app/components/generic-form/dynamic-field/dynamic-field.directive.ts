import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { ButtonComponent } from '../button/button.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { Field } from '../models/field.interface';
import { FIELD_TYPE, FieldConfig } from '../models/field-config.interface';
import { LabelComponent } from '../label/label.component';

export const COMPONENT_MAPPER = {
  [FIELD_TYPE.input]: InputComponent,
  [FIELD_TYPE.select]: SelectComponent,
  [FIELD_TYPE.button]: ButtonComponent,
  [FIELD_TYPE.checkbox]: CheckboxComponent,
  [FIELD_TYPE.label]: LabelComponent,
};

@Directive({
  selector: '[appDynamicField]',
})
export class DynamicFieldDirective implements OnInit, OnChanges, Field {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  @Output() changeHandler: EventEmitter<object> = new EventEmitter<object>();

  componentRef: ComponentRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
  ) {
  }

  ngOnInit(): void {
    if (!COMPONENT_MAPPER[this.field.type]) {
      const supportedTypes = Object.keys(COMPONENT_MAPPER).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.field.type}).
        Supported types: ${supportedTypes}`,
      );
    }
    const factory = this.resolver.resolveComponentFactory(COMPONENT_MAPPER[this.field.type]);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
    this.componentRef.instance.changeHandler = this.changeHandler;
  }

  ngOnChanges(): void {
    if (this.componentRef) {
      this.componentRef.instance.field = this.field;
      this.componentRef.instance.group = this.group;
    }
  }

}
