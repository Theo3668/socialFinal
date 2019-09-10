import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/servece/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username;
  email;

  constructor(private userServ: AuthService, private router: Router, private afAuth: AngularFireAuth, private angularfire:AngularFirestore) {
    
    const key = this.afAuth.auth.currentUser.uid;
    this.username = this.afAuth.auth.currentUser.displayName;
    this.email = this.afAuth.auth.currentUser.email;
    
   }

  ngOnInit() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid; 
    }
  }

}
