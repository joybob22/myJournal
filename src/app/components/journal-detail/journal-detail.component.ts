import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JournalService } from '../../services/journal.service';
import { Journal } from '../../models/journal.model';
import { TagsService } from '../../services/tags.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImagePickerModalComponent } from '../image-picker-modal/image-picker-modal.component';
import { DeleteJournalModalComponent } from '../delete-journal-modal/delete-journal-modal.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-journal-detail',
  templateUrl: './journal-detail.component.html',
  styleUrls: ['./journal-detail.component.scss'],
  animations: [
    trigger(
      'slideDownReg', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0 }),
            animate('0.5s ease-out', 
                    style({ height: '225px' }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: '225px' }),
            animate('0.5s ease-in', 
                    style({ height: 0 }))
          ]
        )
      ]
    )
  ]
})
export class JournalDetailComponent implements OnInit {

  journalId:string;
  journal;
  entryStrippedTags: string;
  editMode:boolean = false;
  tags;
  newTagForm: FormGroup;
  imagesArray;
  editJournalTitleForm: FormGroup;
  newTagName: string;
  selectedTags: Array<string> = [];
  showForm:boolean = false;
  newEntryForm: FormGroup;
  entries;

  constructor(
    private _route: ActivatedRoute,
    private journalService: JournalService,
    private tagsService: TagsService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.journalId = this._route.snapshot.params['id'];
    this.journal = this.journalService.getJournalById(this.journalId).then((data) => {
      this.editJournalTitleForm.patchValue({
        title: data.title
      });
      return data;
    });
    this.entries = this.journalService.getEntriesById(this.journalId);
    this.tags = this.tagsService.getTags;
    this.imagesArray = this.journalService.imagesArray;
    this.newTagForm = this.fb.group({
      tagName: ['', Validators.required]
    });
    this.editJournalTitleForm = this.fb.group({
      title: [this.journal.title, Validators.required]
    });
    this.newEntryForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  showAddNewEntryForm() {
    document.getElementById("addNewJournalButton").classList.add('newJournalFormStyles');
    this.showForm = true;
  }

  closeNewEntryForm() {
    document.getElementById("addNewJournalButton").classList.remove('newJournalFormStyles');
    this.showForm = false;
  }
  
  createNewEntry() {
    this.newEntryForm.markAllAsTouched();
    if(this.newEntryForm.status === "VALID") {
      this.journalService.createNewEntry(this.journalId, this.newEntryForm.value.title);
    }
  }

  handleEditClick() {
    this.editMode = !this.editMode;
  }

  handleNewTagEnterKey(event) {
    if(event.key === "Enter") {
      this.createNewTag();
    }
  }

  createNewTag() {
    this.newTagForm.markAllAsTouched();
    if(this.newTagForm.status === "VALID") {
      this.tags.then(data => {
        data.push(this.newTagForm.value.tagName);
        this.tagsService.updateTags(data);
        this.newTagName = '';
        this.newTagForm.reset();
      });
      // this.tags.push(this.newTagForm.value.tagName);
      
    }
  }

  updateJournalTitle() {
    this.editJournalTitleForm.markAllAsTouched();
    if(this.editJournalTitleForm.status === "VALID" && this.editJournalTitleForm.value.title !== this.journal.title) {
      this.journal = this.journal.then(data => {
        data.title = this.editJournalTitleForm.value.title;
        this.journalService.updateJournal(data);
        return data;
      });
      this.editMode = !this.editMode
    }
  }

  handleTagClick(tag, event) {
    if(this.editMode) {
      this.tags = this.tags.then(data => {
        data = data.filter(dataTag => {
          if(tag !== dataTag) {
            return true;
          }
        });
        this.tagsService.updateTags(data);
        return data;
        
      });
    } else {
      const hasClass = event.target.classList.contains("activeTag");
      if(hasClass) {
        this.renderer.removeClass(event.target, "activeTag");
        this.selectedTags = this.selectedTags.filter(item => {
          if(item !== tag) {
            return true;
          } 
        });
      } else {
        this.selectedTags.push(tag);
        this.renderer.addClass(event.target, "activeTag");
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ImagePickerModalComponent, {
      width: '70%',
      height: '700px',
      data: {journalId: this.journalId}
    });
  }

  openDeleteJournalModal():void {
    this.journal.then(data => {
      const dialogRef = this.dialog.open(DeleteJournalModalComponent, {
        width: '400px',
        data: {journalId: this.journalId, journalTitle: data.title}
      })
    })
    
  }

  signOut() {
    this.authService.logoutUser();
  }



}
