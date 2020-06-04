import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import {CoverThemeData, PaperTypeData} from '../DiaryCustomizationData';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-paper-type',
  templateUrl: './paper-type.component.html',
  styleUrls: ['./paper-type.component.scss']
})
export class PaperTypeComponent implements OnInit {

  @Input()
  data: PaperTypeData;
  selectable = true;

  @Output('update') update: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    if (this.data.name === null) {
      const dialogRef = this.dialog.open(PaperTypeDialog, {
        width: '500px',
        data: Object.assign({}, this.data),
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          this.data.name = result.name;
          this.data.price = result.price;
          this.data.isActive = result.isActive;
          this.update.emit();
        }
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(PaperTypeDialog, {
      width: '500px',
      data: Object.assign({}, this.data)
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data.name = result.name;
      this.data.isActive = result.isActive;
      this.data.price = result.price;
      this.update.emit();
    });
  }

}

@Component({
  selector: 'paper-type-dialog',
  templateUrl: 'paper-type-dialog.html',
})
export class PaperTypeDialog {
  @ViewChild('fileInput', {static: false})
  fileInput;
  file: File | null = null;

  coverThemeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    isActive: new FormControl('', [])
  });
  constructor(
    public dialogRef: MatDialogRef<PaperTypeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CoverThemeData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDialog(): void {
    if (this.coverThemeForm.valid) {
      this.dialogRef.close(this.data);
    }
  }

/*
  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }
*/

  /*async onChangeFileInput() {
    await this.loadImage(this.fileInput.nativeElement.files).then(image =>{
      this.data.image = image;
    });
  }*/

  /*loadImage(file: { [key: string]: File }): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!file[0]) {
          reject('');
      }
      const reader = new FileReader();
      reader.onload = (e) => {
          const base64 = reader.result.toString();
          resolve(base64);
      };
      reader.readAsDataURL(file[0]);
  });
  }*/

}
