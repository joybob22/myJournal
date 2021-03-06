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
  journal:Journal;
  entryStrippedTags: string;
  editMode:boolean = false;
  tags: Array<string>;
  newTagForm: FormGroup;
  imagesArray;
  editJournalTitleForm: FormGroup;
  newTagName: string;
  selectedTags: Array<string> = [];
  showForm:boolean = false;
  newEntryForm: FormGroup

  constructor(
    private _route: ActivatedRoute,
    private journalService: JournalService,
    private tagsService: TagsService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.journalId = this._route.snapshot.params['id'];
    this.journal = this.journalService.getJournalById(this.journalId);
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
      this.tagsService.createNewTag(this.newTagForm.value.tagName);
      this.newTagName = '';
      this.newTagForm.reset();
    }
  }

  updateJournalTitle() {
    this.editJournalTitleForm.markAllAsTouched();
    if(this.editJournalTitleForm.status === "VALID" && this.editJournalTitleForm.value.title !== this.journal.title) {
      this.journal.title = this.journalService.updateJournalTitleById(this.journalId, this.editJournalTitleForm.value.title);
      this.editMode = !this.editMode
    }
  }

  handleTagClick(tag, event) {
    if(this.editMode) {
      this.tagsService.removeTag(tag);
      this.tags = this.tagsService.getTags;
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
    const dialogRef = this.dialog.open(DeleteJournalModalComponent, {
      width: '400px',
      data: {journalId: this.journalId, journalTitle: this.journal.title}
    })
  }



}
