import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import  { map }  from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private http: HttpClient
    ) { }

    private url = 'http://localhost:3000'

  registerUser(email, password) {
    let credentials = {email: email, password: password};
    return this.http.post(this.url + '/registerUser', credentials).toPromise().then((data: any) => {
      if(data.res === "success") {
        this.user = {
          uid: data.user
        }
        this.router.navigate(['dashboard']);
      } else {
        console.log(data.res);
        return data.res
      }
    });
  }

  loginUser(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      this.user = {
        uid: user.user.uid
      }
      this.router.navigate(['dashboard']);
    }).catch((err) => {
      return err;
    })
  }

  logoutUser() {
    this.afAuth.signOut()
      .then(data => {
        this.user = undefined;
        this.router.navigate(['login']);
      })
  }
}


//to get all the entries
// var testing = this.db.collection(`users/${this.user.user.uid}/entries`).get().subscribe(data => data.forEach(function(doc) {
//   console.log(doc.data());
// }));
// console.log(testing);
