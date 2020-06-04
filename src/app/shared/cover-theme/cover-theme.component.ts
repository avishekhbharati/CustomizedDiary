import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { CoverThemeData } from '../DiaryCustomizationData';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-cover-theme',
  templateUrl: './cover-theme.component.html',
  styleUrls: ['./cover-theme.component.scss']
})
export class CoverThemeComponent implements OnInit {

  @Input()
  data: CoverThemeData;
  selectable = true;
  removable = true;

  @Output('deleteTheme') deleteTheme: EventEmitter<any> = new EventEmitter();
  @Output('update') update: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    if (this.data.name === null) {
      const dialogRef = this.dialog.open(CoverThemeDialog, {
        width: '500px',
        data: Object.assign({}, this.data),
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          this.data.name = result.name;
          this.data.price = result.price;
          this.data.isActive = result.isActive;
          this.data.image = result.image;
          this.update.emit();
        } else if (this.data.name === null) {
          this.deleteTheme.emit();
        }
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(CoverThemeDialog, {
      width: '500px',
      data: Object.assign({}, this.data)
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data.name = result.name;
      this.data.isActive = result.isActive;
      this.data.price = result.price;
      this.data.image = result.image;
      this.update.emit();
    });
  }

}

@Component({
  selector: 'cover-theme-dialog',
  templateUrl: 'cover-theme-dialog.html',
  styleUrls: ['./cover-theme.component.scss']
})
export class CoverThemeDialog {
  @ViewChild('fileInput', {static: false})
  fileInput;
  file: File | null = null;
  images = ['bg.jpg', 'bg1.jpg', 'bg2.jpg', 'bg3.jpg'];

  coverThemeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    isActive: new FormControl('', [])
  });
  constructor(
    public dialogRef: MatDialogRef<CoverThemeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CoverThemeData,
    private ng2ImgMax: Ng2ImgMaxService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDialog(): void {
    if (this.coverThemeForm.valid) {
      this.dialogRef.close(this.data);
    }
  }


  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }


  async onChangeFileInput() {
    await this.loadImage(this.fileInput.nativeElement.files, this.ng2ImgMax).then(image =>{
      this.data.image = image;
    });
  }

  loadImage(file: { [key: string]: File }, ng2ImgMax): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!file[0]) {
          reject('');
      }
      ng2ImgMax.resizeImage(file[0], 268, 400).subscribe(
        result => {
          const reader = new FileReader();
          reader.onload = (e) => {
              const base64 = reader.result.toString();
              resolve(base64);
          };
          reader.readAsDataURL(result);
        },
        error => {
          console.log('😢 Oh no!', error);
        }
      );

  });
  }

}
