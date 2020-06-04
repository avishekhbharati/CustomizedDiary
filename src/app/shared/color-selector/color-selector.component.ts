import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { PaperColorData } from '../DiaryCustomizationData';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.scss']
})
export class ColorSelectorComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  @Input()
  data: PaperColorData;

  selectable = true;
  removable = true;

  @Output('deleteColor') deleteColor: EventEmitter<any> = new EventEmitter();
  @Output('update') update: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    if (this.data.name === null) {
      const dialogRef = this.dialog.open(ColorSelectorDialog, {
        width: '500px',
        data: Object.assign({}, this.data)
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          this.data.name = result.name;
          this.data.price = result.price;
          this.data.isActive = result.isActive;
          this.data.value = result.value;
          this.update.emit();
        } else if (this.data.name === null) {
          this.deleteColor.emit();
        }
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ColorSelectorDialog, {
      width: '500px',
      data: Object.assign({}, this.data)
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data.name = result.name;
      this.data.price = result.price;
      this.data.isActive = result.isActive;
      this.data.value = result.value;
      this.update.emit();
    });
  }

  onDelete() {
    this.deleteColor.emit();
  }

}

@Component({
  selector: 'color-selector-dialog',
  templateUrl: 'color-selector-dialog.html',
})
export class ColorSelectorDialog {

  colorForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    isActive: new FormControl('', [])
  });
  constructor(
    public dialogRef: MatDialogRef<ColorSelectorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PaperColorData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDialog(): void {
    if (this.colorForm.valid) {
      this.dialogRef.close(this.data);
    }
  }

}
