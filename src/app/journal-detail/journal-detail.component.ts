import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JournalService } from '../services/journal.service';
import { Journal } from '../models/journal.model';
import { TagsService } from '../services/tags.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-journal-detail',
  templateUrl: './journal-detail.component.html',
  styleUrls: ['./journal-detail.component.scss']
})
export class JournalDetailComponent implements OnInit {

  journalId:string;
  journal:Journal;
  editMode:boolean = false;
  tags: Array<string>;
  newTagForm: FormGroup;
  newTagName: string;
  selectedTags: Array<string> = [];

  constructor(
    private _route: ActivatedRoute,
    private journalService: JournalService,
    private tagsService: TagsService,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.journalId = this._route.snapshot.params['id'];
    this.journal = this.journalService.getJournalById(this.journalId);
    this.tags = this.tagsService.getTags;
    this.newTagForm = this.fb.group({
      tagName: ['', Validators.required]
    });
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



}
