import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router'

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any,
    private router: Router,
    ) { }

  ngOnInit( ) { }

  onYesClick(): void {
    this.dialogRef.close();
    this.router.navigate(['']);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

