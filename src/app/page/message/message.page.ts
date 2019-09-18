import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/servece/auth.service';
import * as firebase from 'firebase';

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
  constructor(private fire:AngularFirestore, private nav:Router,private chatapp:AuthService,
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

  onBack(){
    this.nav.navigateByUrl("login/users");
  }

}
