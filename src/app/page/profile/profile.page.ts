import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/servece/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {finalize} from 'rxjs/operators';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';

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

  id;
  name;
  url;
  users: AngularFirestoreDocument;
  sub;
  photoURL:any;
  uploadState: any;
  ref;
  downloadURL: any;

  constructor(private userServ: AuthService, private router: Router, private afAuth: AngularFireAuth, private angularfire:AngularFirestore,
   public zone: NgZone, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
   ,public Storage: AngularFireStorage) {
    
    // this.username = this.afAuth.auth.currentUser.displayName;
    // this.email = this.afAuth.auth.currentUser.email;
    // const uid = this.afAuth.auth.currentUser.uid;

    // this.userServ.getUser(key).subscribe( data =>{
    // this.userList = data;
    // console.log(data)
    // })
    this.afAuth.auth.currentUser.photoURL;
    this.name=afAuth.auth.currentUser.displayName;

    this.users=angularfire.doc(`user/${this.afAuth.auth.currentUser.uid}`)
    this.sub=this.users.valueChanges().subscribe(event=>{
      this.photoURL = event.photoURL
    })
   }

   upload(event) {
     const file= event.target.files[0];
    this.id = Math.random().toString(36).substring(2);
   const filepath=this.id;
   this.ref = this.Storage.ref(filepath);
   const task = this.Storage.upload(filepath, file);
   
   this.uploadState = task.percentageChanges();
   task.snapshotChanges().pipe(
     finalize(() => {
       this.downloadURL = this.ref.getDownloadURL().subscribe(url=>{
          console.log(url);
          this.afAuth.auth.currentUser.updateProfile({
           photoURL: url
          })
          this.users.update({
            photoURL: url
          })
        })
      })
    ).subscribe();
  } 

   onEdit(userList){
    this.router.navigate(['/update'], {queryParams:{key: userList.key, Gender: userList.Gender, displayName: userList.displayName, photoURL: userList.photoURL}})
   }

  ngOnInit() {
    
  }

}
