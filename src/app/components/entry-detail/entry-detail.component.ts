import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JournalService } from '../../services/journal.service';
import { Entries } from '../../models/entries.model';
import { EditorChangeContent, EditorChangeSelection, QuillEditorComponent, ContentChange } from 'ngx-quill';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { TagsService } from '../../services/tags.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.scss']
})
export class EntryDetailComponent implements OnInit {

  journalId;
  journalTitle;
  entryId;
  entryContent = '';
  tags;
  editEntryForm: FormGroup;
  entry;
  editMode: boolean = false;
  datePickerDate;
  hide = false
  form: FormGroup
  

  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private journalService: JournalService,
    private sanitizer: DomSanitizer,
    private tagsService: TagsService,
    private authService: AuthService
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
    this.journalTitle = this.journalService.getJournalTitleById(journalId);
    this.entry = this.journalService.getEntryById(journalId, entryId)
      .then((data) => {
        this.editEntryForm.patchValue({
          entryContent: data.body,
          datePicker: data.date,
          title: data.title
        });
        
        this.datePickerDate.value = data.date;
        
        return data;
      })

    this.tags = this.tagsService.getTags;
    
    this.editEntryForm =  this.fb.group({
      entryContent: [this.entry.body, Validators.required],
      datePicker: [this.entry.date, Validators.required],
      title: [this.entry.title, Validators.required]
    });
    
    this.datePickerDate = new FormControl(this.editEntryForm.value.datePicker);
  }

  updateSelectedTags(tag) {
    let newTags;
    this.entry.then(data => {
      if(data.selectedTags.includes(tag)) {
        newTags = data.selectedTags.filter(tagItem => {
          if(tag === tagItem) {
            return false;
          } else {
            return true;
          }
        });
      } else {
        newTags = data.selectedTags;
        newTags.push(tag);
      }
      this.journalService.updateSelectedTags(this.journalId, this.entryId, newTags).then(updated => {
        data.selectedTags = newTags;
        console.log(data.selectedTags);
      })
    });

  }


  saveEntry() {
    this.editEntryForm.markAllAsTouched();
    if(this.editEntryForm.status === "VALID") {
      const editedEntry = {
        title: this.editEntryForm.value.title,
        date: this.editEntryForm.value.datePicker,
        body: this.editEntryForm.value.entryContent,
        selectedTags: this.entry.selectedTags,
        lastEdit: new Date()
      }

      this.entry = this.journalService.updateEntryById(this.journalId, this.entryId, editedEntry)
        .then(newEntry => {
          this.editMode = !this.editMode;
          return newEntry;
        });
      
    }

  }
  
  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

  signOut() {
    this.authService.logoutUser();
  }





}
