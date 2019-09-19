import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/servece/auth.service';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  items={
    uid:"",
    displayName:"",
    photoURL:""
  };

  text;
  chatref: any;
  uid: string;
  singleUser;
  textTO: string;
  sendto:any;
  chat: any;
  socialSharing: any;

  message;
  subject;
  file;
  link;

  id;
  name;
  url;
  users: AngularFirestoreDocument;
  sub;
  photoURL:any;
  uploadState: any;
  ref;
  downloadURL: any;

  constructor(public actionSheetContr: ActionSheetController , public Storage: AngularFireStorage, private fire:AngularFirestore, private nav:Router,private chatapp:AuthService,
    private route:ActivatedRoute,  private afAuth: AngularFireAuth) {
    this.route.queryParams.subscribe(params => {
      console.log(params)

      this.items.uid = params.uid
      this.items.displayName = params.displayName
      this.items.photoURL = params.photoURL
      this.singleUser=params.uid

      console.log(this.items.photoURL,this.items.uid,this.items.displayName)
      
   })
   this.uid=this.afAuth.auth.currentUser.uid;
   this.chat=this.fire.collection('private', ref=>ref.orderBy('TimeStamp')).valueChanges();
 
  }

  ngOnInit() {
  }

  Send(){
    if(this.textTO!=''){
      this.fire.collection('private').add({
        UserID:this.afAuth.auth.currentUser.uid,
        Name:this.afAuth.auth.currentUser.displayName,
        Message:this.textTO,
        sendto:this.singleUser,
        TimeStamp:firebase.firestore.FieldValue.serverTimestamp(),
      });
      this.textTO="";
    }
    
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

    this.socialSharing.share(this.message, this.subject, this.file, this.link)
    .then(() => {
    }).catch(() => {
    });

 } 


 async presentActionSheet() {
  const actionSheet = await this.actionSheetContr.create({
    header: 'Albums',
    buttons: [{
      text: 'Attach picture',
      icon: 'images',
      handler: () => {
        console.log('Delete clicked');
      }
    }, {
      text: 'Take picture',
      icon: 'camera',
      handler: () => {
        
        console.log('Favorite clicked');
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();
}

  onBack(){
    this.nav.navigateByUrl("login/users");
  }

}
