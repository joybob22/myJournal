import { Injectable } from '@angular/core';
import { Journal } from '../models/journal.model';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor() { }

  get journals() {
    return [
      {
        title: 'My First Journal',
        id: '0',
        img: 'beige-and-black-chair-in-front-of-white-desk-509922.jpg',
        entries: [
          {
            title: 'Day 1',
            date: new Date(),
            body: 'Stuff happened bro',
            id: '0'
          },
          {
            title: 'Day 2',
            date: new Date(),
            body: 'Stuff happened bro',
            id: '1'
          },
          {
            title: 'Day 3',
            date: new Date(),
            body: 'Stuff happened bro',
            id: '2'
          },
        ]
      },
      {
      title: 'The Mission',
      id: '1',
      img: 'buildings-city-city-view-cityscape-597909.jpg',
      entries: [
        {
          title: 'Day 1',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '0'
        },
        {
          title: 'Day 2',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '1'
        },
        {
          title: 'Day 3',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '2'
        },
      ]
    },
    {
      title: 'Post Mission',
      id: '2',
      img: 'time-lapse-photo-of-stars-on-night-924824.jpg',
      entries: [
        {
          title: 'Day 1',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '0'
        },
        {
          title: 'Day 2',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '1'
        },
        {
          title: 'Day 3',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '2'
        },
      ]
    },
    {
      title: 'Pre Mission',
      id: '3',
      img: 'barbells-on-gray-surface-669584.jpg',
      entries: [
        {
          title: 'Day 1',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '0'
        },
        {
          title: 'Day 2',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '1'
        },
        {
          title: 'Day 3',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '2'
        },
      ]
    },
    {
      title: 'Gratitude',
      id: '4',
      img: 'you-are-not-alone-quote-board-on-brown-wooden-frame-2821220.jpg',
      entries: [
        {
          title: 'Day 1',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '0'
        },
        {
          title: 'Day 2',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '1'
        },
        {
          title: 'Day 3',
          date: new Date(),
          body: 'Stuff happened bro',
          id: '2'
        },
      ]
    }
  ]
  }

  getJournalById(id:string):Journal {
    let theJournal = this.journals.filter(journal => {
      if(journal.id === id) {
        return true;
      } else {
        return false;
      }
    })[0];
    return theJournal
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
