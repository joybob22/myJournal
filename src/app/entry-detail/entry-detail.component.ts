import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JournalService } from '../services/journal.service';
import { Entries } from '../models/entries.model';


@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.scss']
})
export class EntryDetailComponent implements OnInit {

  journalId;
  entryId;
  entryContent = '';
  editEntryForm: FormGroup;
  entry:Entries;
  editMode: boolean = false;
  datePickerDate;

  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private journalService: JournalService
  ) { }

  ngOnInit(): void {
    const journalId = this._route.snapshot.params['id'];
    const entryId = this._route.snapshot.params['entryId'];
    this.journalId = journalId;
    this.entryId = entryId;
    this.entry = this.journalService.getEntryById(journalId, entryId);


    this.editEntryForm =  this.fb.group({
      entryContent: [this.entry.body, Validators.required],
      datePicker: [this.entry.date, Validators.required],
      title: [this.entry.title, Validators.required]
    });

    this.datePickerDate = new FormControl(this.entry.date);
    
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '30rem',
    minHeight: '5rem',
    placeholder: 'Start typing here',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };


  saveEntry() {
    this.editEntryForm.markAllAsTouched();
    if(this.editEntryForm.status === "VALID") {
      const editedEntry:Entries = {
        title: this.editEntryForm.value.title,
        date: this.editEntryForm.value.datePicker,
        body: this.editEntryForm.value.entryContent,
        id: this.entry.id
      }

      const updatedEntry = this.journalService.updateEntryById(this.journalId, this.entryId, editedEntry);
      this.entry = updatedEntry;
      this.editMode = !this.editMode;
    }

  }

}
