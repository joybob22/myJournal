import { Component, OnInit } from '@angular/core';
import { JournalService } from '../services/journal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  journals;
  showForm:boolean = false;
  newJournalForm: FormGroup;

  constructor(
    private journalService: JournalService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.journals = this.journalService.journals;
    this.newJournalForm = this.fb.group({
      title: ['', [Validators.required]]
    })
  }

  showAddJournalForm() {
    document.getElementById("addNewJournalButton").classList.add('newJournalFormStyles');
    this.showForm = true;
  }

  closeForm() {
    
    document.getElementById("addNewJournalButton").classList.remove('newJournalFormStyles');
    this.showForm = false;
  }

  createNewJournal() {
    this.newJournalForm.markAllAsTouched();
    if(this.newJournalForm.status === "VALID") {
      console.log(this.newJournalForm);
    }
  }

}
