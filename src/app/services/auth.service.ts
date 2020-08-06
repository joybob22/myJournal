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
        this.user = data.user;
        this.router.navigate(['dashboard']);
      } else {
        return data.res
      }
    })
      




    // return this.afAuth.createUserWithEmailAndPassword(email, password).then((user) => {
    //   console.log(user);
    //   this.user = user;

    //   this.db.collection(`users/${this.user.user.uid}/journals`).add({
    //     title: 'Example Journal',
    //     dateCreated: new Date()
    //   });

    //   let docId;
    //   //add the first journal
    //   this.db.collection(`users/${this.user.user.uid}/journals`).snapshotChanges().pipe(map( actions => {
    //     return actions.map( data => {
    //       docId =  data.payload.doc.id
    //       //add the first entry in that journal
    //       console.log(data);
    //       this.db.collection(`users/${this.user.user.uid}/journals/${docId}/entries`).add({
    //         title: 'your first entry',
    //         body: 'This is your very first entry that you get to have!',
    //         image: 'selective-focus-photography-of-person-touch-the-white-704813.jpg',
    //         dateCreated: new Date(),
    //         dateEdited: new Date(),
    //         dateEventHappened: new Date()
    //       });
    //     })
    //   }));
    //   console.log(docId);

      
      
    //   this.router.navigate(['dashboard']);
    // }).catch((err) => {
    //   return err;
    // });
  }

  loginUser(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      this.user = user;
      console.log(user);
      this.router.navigate(['dashboard']);
    }).catch((err) => {
      return err;
    })
  }
}


//to get all the entries
// var testing = this.db.collection(`users/${this.user.user.uid}/entries`).get().subscribe(data => data.forEach(function(doc) {
//   console.log(doc.data());
// }));
// console.log(testing);
