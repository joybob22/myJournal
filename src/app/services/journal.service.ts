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
    const newJournal = {
      title: title,
      img: this.imagesArray[Math.round(Math.random() * this.imagesArray.length - 1)]
    }

    this.http.post<any>(`${this.url}/createNewJournal`, {uid: this.authService.user.uid, journal: newJournal}).toPromise()
      .then(data => {
        this.router.navigate(['../journal/' + data.journalId]);
      });
  }

  createNewEntry(journalId:string, entryTitle:string) {
    this.http.post<any>(`${this.url}/createEntry`, {journalId: journalId, entryTitle: entryTitle, uid: this.authService.user.uid}).toPromise()
      .then(data => {
        if(data.err) {
          console.log(data.err);
        } else {
          this.router.navigate(['../../journal/' + journalId + '/' + data.id]);
        }
      })
      .catch(err => {
        console.log(err);
      });
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
    return this.http.get<any>(`${this.url}/journalById`, {params: {uid: this.authService.user.uid, id: id}}).toPromise()
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateJournal(journal) {
    return this.http.post<any>(`${this.url}/updateJournal`, {journal: journal, uid: this.authService.user.uid}).toPromise();
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

  loadMoreEntries(entryId, journalId) {
    return this.http.get<any>(`${this.url}/entriesFromLastId`, {params: {uid: this.authService.user.uid, id: journalId, entryId: entryId}}).toPromise()
      .then(data => {
        return data;
      })
  }

  updateEntryById(journalId:string, entryId:string, editedEntry) {
    console.log(editedEntry);
    if(!editedEntry.selectedTags) {
      editedEntry.selectedTags = [];
    }

    return this.http.post<any>(`${this.url}/updateEntry`, {
      editedEntry: editedEntry,
      journalId: journalId,
      entryId: entryId,
      uid: this.authService.user.uid
    }).toPromise().then(data => {
      if(data.err) {
        console.log(data.err);
      } else {
        return data;
      }
    })

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

  updateSelectedTags(journalId:string, entryId:string, selectedTags:Array<string>) {
    return this.http.post<any>(`${this.url}/updateSelectedTags`, {
      journalId: journalId,
      entryId: entryId,
      selectedTags: selectedTags,
      uid: this.authService.user.uid
    }).toPromise().then(data => {
      if(data) {
        console.log(data);
      } else {
        return data;
      }
    })
  }

  updateDisplayImage(journalId: string, imageIndex) {
    return this.http.post<any>(`${this.url}/updateJournal`, {journal: {img: this.imagesArray[imageIndex], docId: journalId}, uid: this.authService.user.uid}).toPromise();
    this.journals.map(journal => {
      if(journal.id === journalId) {
        journal.img = this.imagesArray[imageIndex];
      }
    })
  }

  deleteJournalById(journalId:string) {
    this.http.delete(`${this.url}/deleteJournal`, {params: {uid: this.authService.user.uid, journalId: journalId}}).toPromise()
      .then(data => {
        this.router.navigate(['../../dashboard']);
      })
      .catch(err => {
        console.log(err);
      })
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
