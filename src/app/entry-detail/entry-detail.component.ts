import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JournalService } from '../services/journal.service';
import { Entries } from '../models/entries.model';

@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.scss']
})
export class EntryDetailComponent implements OnInit {

  entryContent = '';
  editEntryForm: FormGroup;
  entry:Entries;

  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private journalService: JournalService
  ) { }

  ngOnInit(): void {
    const journalId = this._route.snapshot.params['id'];
    const entryId = this._route.snapshot.params['entryId'];
    this.entry = this.journalService.getEntryById(journalId, entryId);


    this.editEntryForm =  this.fb.group({
      entryContent: ['', Validators.required]
    });
    
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

}
