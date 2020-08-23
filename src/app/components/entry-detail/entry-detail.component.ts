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
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../error-modal/error-modal.component';


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
  uploading: boolean = false;

  public editorOptions = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link']                         // link and image, video
    ]
};
  

  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private journalService: JournalService,
    private sanitizer: DomSanitizer,
    private tagsService: TagsService,
    private authService: AuthService,
    private dialog: MatDialog,
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
    if(!this.uploading) {
      this.uploading = true;
      this.editEntryForm.markAllAsTouched();
      if(this.editEntryForm.status === "VALID") {
        const editedEntry = {
          title: this.editEntryForm.value.title,
          date: this.editEntryForm.value.datePicker,
          body: this.editEntryForm.value.entryContent,
          selectedTags: this.entry.selectedTags,
          lastEdit: new Date()
        }
        
        this.journalService.updateEntryById(this.journalId, this.entryId, editedEntry)
        .then(newEntry => {
          if(newEntry.error) {
            if(newEntry.error.message === `The value of property "body" is longer than 1048487 bytes.`) {
              const dialogRef = this.dialog.open(ErrorModalComponent, {
                width: '400px',
                data: {errTitle: "Unable to update entry", errMessage: `The entry has become too large to upload. You will need to start a new entry. Thank you.`}
              })
              this.uploading = false;
              this.editMode = !this.editMode;
            } else {
              const dialogRef = this.dialog.open(ErrorModalComponent, {
                width: '400px',
                data: {errTitle: "An unknown error has occurred", errMessage: `The entry was not able to update. This is either because of an unstable internet connection
                or the entry is too large. An entry can become too large when many images are being uploaded.
                If you are using a lot of images try making the images smaller or make a new entry and upload more images there.
                Sorry for any inconvenience.`}
              })
              this.uploading = false;
              this.editMode = !this.editMode;
            }
          }
          else {
            this.entry.then(data => {
              this.uploading = false;
              this.editMode = !this.editMode;
              return newEntry
            })
          }
          
        });
        
      }
      
    }
  }
    
    byPassHTML(html: string) {
      return this.sanitizer.bypassSecurityTrustHtml(html)
    }

  signOut() {
    this.authService.logoutUser();
  }





}
