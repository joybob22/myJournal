import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inputMatch } from 'src/app/validators/inputMatch.validator';
import { JournalService } from 'src/app/services/journal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-journal-modal',
  templateUrl: './delete-journal-modal.component.html',
  styleUrls: ['./delete-journal-modal.component.scss']
})
export class DeleteJournalModalComponent implements OnInit {

  deleteJournalForm: FormGroup

  constructor(
    private dialogRef: MatDialogRef<DeleteJournalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private journalService: JournalService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.deleteJournalForm = this.fb.group({
      title: ['', [Validators.required]]
    },
      {validator: inputMatch(this.data.journalTitle)}
    );

  }

  deleteJournal() {
    this.deleteJournalForm.markAllAsTouched();
    if(this.deleteJournalForm.status === "VALID") {
      this.journalService.deleteJournalById(this.data.journalId);
      this.dialogRef.close();
      this.router.navigate(['dashboard']);
    }
  }

}
