import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  tags: Array<string> = ['Gratitude', 'Love', 'Spiritual', 'Hard Days', 'The Grind', 'Service', 'Work'];

  constructor() { }

  get getTags() {
    return this.tags
  }

  createNewTag(tag:string):void {
    this.tags.push(tag);
  }

  removeTag(tag:string):void {
    this.tags = this.tags.filter(item => {
      if(item !== tag) {
        return true;
      }
    })
  }
 
}
