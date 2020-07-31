import { Component, OnInit } from '@angular/core';
import { JournalService } from '../../services/journal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Journal } from '../../models/journal.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  journals;
  firstJournal: Journal;
  showForm:boolean = false;
  newJournalForm: FormGroup;

  constructor(
    private journalService: JournalService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.journals = this.journalService.journals.filter((journal, index) => {
      if(index != 0) {
        return true;
      } else {
        this.firstJournal = journal;
      }
    });
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
      this.journalService.createNewJournal(this.newJournalForm.value.title);
    }
  }

}
