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
  userList
  user = {} as User;

  constructor(private userServ: AuthService, private router: Router, private afAuth: AngularFireAuth, private angularfire:AngularFirestore) {
    
    // this.username = this.afAuth.auth.currentUser.displayName;
    // this.email = this.afAuth.auth.currentUser.email;
    const key = this.afAuth.auth.currentUser.uid;

    this.userServ.getUser(key).subscribe( data =>{
    this.userList = data;
    console.log(data)
    })
   }

   onEdit(userList){
    this.router.navigate(['/update'], {queryParams:{key: userList.key, Gender: userList.Gender, displayName: userList.displayName, photoURL: userList.photoURL}})
   }

  ngOnInit() {
    
  }

}
