import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JournalService } from '../services/journal.service';
import { Journal } from '../models/journal.model';

@Component({
  selector: 'app-journal-detail',
  templateUrl: './journal-detail.component.html',
  styleUrls: ['./journal-detail.component.scss']
})
export class JournalDetailComponent implements OnInit {

  journalId:string;
  journal:Journal;
  constructor(
    private _route: ActivatedRoute,
    private journalService: JournalService
  ) { }

  ngOnInit(): void {
    this.journalId = this._route.snapshot.params['id'];
    this.journal = this.journalService.getJournalById(this.journalId);
    console.log(this.journal);
  }



}
