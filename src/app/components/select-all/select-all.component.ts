import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-all',
  templateUrl: './select-all.component.html',
  styleUrls: ['./select-all.component.scss']
})
export class SelectAllComponent implements OnInit {
  @Input() dependedItems: any[];
  @Input() disabled: boolean;
  @Output() selectAllReady: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelectAll(event): void {
    if (this.dependedItems) {
      this.dependedItems.forEach(item => {
        item.selected = event.checked;
      });
      this.selectAllReady.emit();
    }
  }

  isAllSelected(): boolean {
    if (this.dependedItems) {
      const checkedItems = this.dependedItems.filter(item => {
        return item.selected;
      });
      return checkedItems.length === this.dependedItems.length;
    } else {
      return false;
    }
  }

}
