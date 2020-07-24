import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JournalService } from '../services/journal.service';
import { Entries } from '../models/entries.model';
import { EditorChangeContent, EditorChangeSelection, QuillEditorComponent, ContentChange } from 'ngx-quill';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';


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
  hide = false
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private journalService: JournalService,
    private sanitizer: DomSanitizer
  ) {
    this.form = fb.group({
      editor: ['<ol><li>test</li><li>123</li></ol>']
    })
  }

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


  saveEntry() {
    this.editEntryForm.markAllAsTouched();
    if(this.editEntryForm.status === "VALID") {
      console.log(this.editEntryForm.value.entryContent);
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
  
  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }



}
