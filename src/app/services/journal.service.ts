import { Injectable } from '@angular/core';
import { Journal } from '../models/journal.model';
import { Entries } from '../models/entries.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(
    private router: Router,
    private http:HttpClient,
    private authService: AuthService
  ) { }

  url = 'http://localhost:3000';

  journals =
     [
      {
        title: 'My First Journal',
        id: '0',
        img: 'beige-and-black-chair-in-front-of-white-desk-509922.jpg',
        entries: [
          {
            title: 'Day 1',
            date: new Date(),
            body: 'Stuff happened bro',
            id: '0',
            selectedTags: ['Gratitude', 'The Grind'],
            lastEdit: new Date('April 20, 2020 09:22:12')
          },
          {
            title: 'Day 2',
            date: new Date(),
            body: 'Stuff happened bro',
            id: '1',
            selectedTags: ['Gratitude', 'The Grind'],
            lastEdit: new Date('April 20, 2020 09:22:12')
          },
          {
            title: 'Day 3',
            date: new Date(),
            body: 'Stuff happened bro',
            id: '2',
            selectedTags: ['Gratitude', 'The Grind'],
            lastEdit: new Date('April 20, 2020 09:22:12')
          },
        ]
      },
      {
      title: 'The Mission',
      id: '1',
      img: 'man-wearing-face-mask-3942124.jpg',
      entries: [
        {
          title: 'Day 1',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '0',
          selectedTags: ['Gratitude', 'The Grind'],
          lastEdit: new Date('April 20, 2020 09:22:12')
        },
        {
          title: 'Day 2',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '1',
          selectedTags: ['Gratitude', 'The Grind'],
          lastEdit: new Date('April 20, 2020 09:22:12')
        },
        {
          title: 'Day 3',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '2',
          selectedTags: ['Gratitude', 'The Grind'],
          lastEdit: new Date('April 20, 2020 09:22:12')
        },
      ]
    },
    {
      title: 'Post Mission',
      id: '2',
      img: 'hay-haystack-meditate-meditating-268013.jpg',
      entries: [
        {
          title: 'Day 1',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '0',
          selectedTags: ['Gratitude', 'The Grind'],
          lastEdit: new Date('April 20, 2020 09:22:12')
        },
        {
          title: 'Day 2',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '1',
          selectedTags: ['Gratitude', 'The Grind'],
          lastEdit: new Date('April 20, 2020 09:22:12')
        },
        {
          title: 'Day 3',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '2',
          selectedTags: ['Gratitude', 'The Grind'],
          lastEdit: new Date('April 20, 2020 09:22:12')
        },
      ]
    },
    {
      title: 'Pre Mission',
      id: '3',
      img: 'beach-dawn-dusk-ocean-189349.jpg',
      entries: [
        {
          title: 'Day 1',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '0',
          selectedTags: ['Gratitude', 'The Grind'],
          lastEdit: new Date('April 20, 2020 09:22:12')
        },
        {
          title: 'Day 2',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '1',
          selectedTags: ['Gratitude', 'The Grind'],
          lastEdit: new Date('April 20, 2020 09:22:12')
        },
        {
          title: 'Day 3',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '2',
          selectedTags: ['Gratitude', 'The Grind'],
          lastEdit: new Date('April 20, 2020 09:22:12')
        },
      ]
    },
    {
      title: 'Gratitude',
      id: '4',
      img: 'man-using-barbell-2261482.jpg',
      entries: [
        {
          title: 'Day 1',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '0',
          selectedTags: ['Gratitude', 'The Grind'],
          lastEdit: new Date('April 20, 2020 09:22:12')
        },
        {
          title: 'Day 2',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '1',
          selectedTags: ['Gratitude', 'The Grind'],
          lastEdit: new Date('April 30, 2020 09:22:12')
        },
        {
          title: 'Day 3',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '2',
          selectedTags: ['Gratitude', 'The Grind'],
          lastEdit: new Date()
        },
      ]
    }
  ]

  createNewJournal(title:string) {
    const newJournal:Journal = {
      title: title,
      id: (Number(this.journals[this.journals.length - 1].id) + 1).toString(),
      img: this.imagesArray[Math.round(Math.random() * this.imagesArray.length - 1)],
      entries: []
    }

    this.journals.push(newJournal);
    this.router.navigate(['../journal/' + newJournal.id]);
    
  }

  createNewEntry(journalId:string, entryTitle:string) {

    let entryId;

    this.journals.forEach(journal => {
      if(journal.id === journalId) {
        entryId = (journal.entries.length).toString()
      }
    })

    const newEntry:Entries = {
      title: entryTitle,
      date: new Date(),
      body: 'This is the start to your entry!',
      id: entryId,
      selectedTags: [],
      lastEdit: new Date()
    }

    this.journals.map(journal => {
      if(journal.id === journalId) {
        journal.entries.push(newEntry);
      }
    });

    this.router.navigate(['../../journal/' + journalId + '/' + entryId]);
  }

  getAllJournals() {
    return this.http.get(`${this.url}/allJournals`,{params: {uid: this.authService.user.uid}}).toPromise()
      .then((data: any) => {
        if(data[0].err) {
          //do something for errors
          return data;
        } else {

          return data;
        }
      }).catch(err => {
        console.log(err);
      })
  }

  getJournalById(id:string) {
    return this.http.get(`${this.url}/journalById`, {params: {uid: this.authService.user.uid, id: id}}).toPromise()
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  getEntriesById(id:string) {
    return this.http.get(`${this.url}/entriesById`, {params: {uid: this.authService.user.uid, id: id}}).toPromise()
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      })
  }

  getJournalTitleById(id:string) {
    return this.http.get(`${this.url}/journalTitle`, {params: {uid: this.authService.user.uid, id: id}}).toPromise()
      .then(data => {
        return data;
      })
    let theJournal = this.journals.filter(journal => {
      if(journal.id === id) {
        return true;
      } else {
        return false;
      }
    })[0];

    return theJournal.title;
  }

  updateJournalTitleById(id:string, newTitle:string):string {
    this.journals.map(journal => {
      if(journal.id === id) {
        journal.title = newTitle
      }
    });
    return newTitle;
  }

  getEntryById(journalId:string, entryId:string) {
    return this.http.get<any>(`${this.url}/entryById`, {params: {uid: this.authService.user.uid, journalId: journalId, entryId: entryId}}).toPromise()
      .then(data => {
        return data;
      })

    // const theJournal = this.getJournalById(journalId);
    // return theJournal.entries.filter(entry => {
    //   if(entry.id === entryId) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // })[0];
  }

  updateEntryById(journalId:string, entryId:string, editedEntry:Entries):Entries {
    this.journals.map(journal => {
      if(journal.id === journalId) {
        journal.entries.map((entry, index) => {
          if(entry.id === entryId) {
            journal.entries[index] = editedEntry;
          }
        });
      }
    });
    return editedEntry;
  }

  updateSelectedTags(journalId:string, entryId:string, selectedTags:Array<string>):Array<string> {
    this.journals.map(journal => {
      if(journal.id === journalId) {
        journal.entries.map(entry => {
          if(entry.id === entryId) {
            entry.selectedTags = selectedTags;
            return;
          }
        });
      }
    });
    console.log(this.journals);
    return selectedTags;
  }

  updateDisplayImage(journalId: string, imageIndex) {
    this.journals.map(journal => {
      if(journal.id === journalId) {
        journal.img = this.imagesArray[imageIndex];
      }
    })
  }

  deleteJournalById(journalId:string) {
    this.journals = this.journals.filter(journal => {
      if(journal.id === journalId) {
        return false;
      }
      return true;
    });
  }



  get imagesArray() {
    return [
      'abstract-board-game-bundle-business-267355.jpg',
      'adult-affection-baby-child-302083.jpg',
      'architecture-books-building-indoors-207742.jpg',
      'architecture-buildings-business-city-374603.jpg',
      'art-blue-bright-colors-911254.jpg',
      'art-color-colors-colour-9403.jpg',
      'athlete-barbell-bodybuilder-bodybuilding-416717.jpg',
      'barbells-on-gray-surface-669584.jpg',
      'beach-dawn-dusk-ocean-189349.jpg',
      'beige-and-black-chair-in-front-of-white-desk-509922.jpg',
      'brown-book-page-1112048.jpg',
      'brown-landscape-under-grey-sky-3244513.jpg',
      'buildings-city-city-view-cityscape-597909.jpg',
      'close-up-photo-of-writings-on-the-paper-760724.jpg',
      'cold-landscape-light-long-exposure-259612.jpg',
      'computer-desk-hand-laptop-374631.jpg',
      'dark-light-long-exposure-men-48801.jpg',
      'egg-power-fear-hammer-40721.jpg',
      'group-of-people-on-road-with-assorted-color-smokes-889545.jpg',
      'hay-haystack-meditate-meditating-268013.jpg',
      'horseshoe-bend-photo-86703.jpg',
      'lights-night-weather-storm-66867.jpg',
      'man-couple-love-people-3958431.jpg',
      'man-using-barbell-2261482.jpg',
      'man-wearing-face-mask-3942124.jpg',
      'mountains-nature-arrow-guide-66100.jpg',
      'person-holding-dslr-camera-reflected-on-black-framed-wing-867345.jpg',
      'photo-of-people-in-the-library-1034008.jpg',
      'seaside-994605.jpg',
      'selective-focus-photography-of-person-touch-the-white-704813.jpg',
      'silhouette-of-people-beside-usa-flag-1046399.jpg',
      'snowy-pathway-surrounded-by-bare-tree-839462.jpg',
      'time-lapse-photo-of-stars-on-night-924824.jpg',
      'two-black-pendant-lamp-on-white-concrete-ceiling-973505.jpg',
      'when-will-you-return-signage-1749057.jpg',
      'woman-holding-no-comment-signage-684319.jpg',
      'you-are-not-alone-quote-board-on-brown-wooden-frame-2821220.jpg'
    ]
  }
}
