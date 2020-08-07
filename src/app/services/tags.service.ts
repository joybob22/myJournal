import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  tags: Array<string> = ['Gratitude', 'Love', 'Spiritual', 'Hard Days', 'The Grind', 'Service', 'Work'];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }
  url = 'http://localhost:3000';

  get getTags() {
    return this.http.get(`${this.url}/tags`, {params: {uid: this.authService.user.uid}})
      .toPromise().then(data => {
        return data;
      });
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
