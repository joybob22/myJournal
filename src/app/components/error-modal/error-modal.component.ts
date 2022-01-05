import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteJournalModalComponent } from '../delete-journal-modal/delete-journal-modal.component';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {

  errMessage = "";
  errTitle = "";

  constructor(
    private dialogRef: MatDialogRef<DeleteJournalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
    this.errMessage = this.data.errMessage;
    this.errTitle = this.data.errTitle;
  }

  close() {
    this.dialogRef.close();
  }

}
