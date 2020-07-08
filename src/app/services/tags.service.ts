import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor() { }

  get tags() {
    return ['Gratitude', 'Love', 'Spiritual', 'Hard Days', 'The Grind', 'Service', 'Work']
  }
}
