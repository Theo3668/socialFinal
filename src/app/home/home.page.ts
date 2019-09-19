import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import{AngularFirestore} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../servece/auth.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  Username:string;
  Gender:string;
  Email:string;
  pdw:string
  userII:string;

  isForgotPassword: boolean;
  hide: boolean = true;
  responseMessageType: string = '';
  responseMessage: string = '';

  constructor(private afAuth: AngularFireAuth, private fire:AngularFirestore,
    private alert:AlertController,private route:Router,
    private chatapp:AuthService, private nav:NavController) {

      this.isForgotPassword = false;
    }


 signup(){
   this.afAuth.auth.createUserWithEmailAndPassword(this.Email,this.pdw).then(()=> {
     localStorage.setItem('userid',this.afAuth.auth.currentUser.uid);

     this.isForgotPassword = false;
    //  ---------------
    this.fire.collection('user').doc(this.afAuth.auth.currentUser.uid).set({
      displayName:this.Username,
      Gender:this.Gender,
      userII: this.afAuth.auth.currentUser.uid,
      TimeStamp:firestore.FieldValue.serverTimestamp(),
      Email:this.Email,
      photoURL:''
    }).catch(error=>{
      alert(error.message)
    })
    //  ---------------

     this.afAuth.auth.currentUser.updateProfile({
       displayName:this.Username,
       photoURL:''

     }).then(()=> {
       this.nav.navigateRoot('/home');

     }).catch(err=>{
alert(err.message)   
  })
   }).catch(err=>{
     alert(err.message)
   })
 }

 privateLogin(){
  this.chatapp.Anonymous().then(()=>{
    this.afAuth.auth.currentUser.updateProfile({
      displayName:"private user",
      photoURL:'' 
    })
     this.fire.collection('user').doc(this.afAuth.auth.currentUser.uid).set({
      displayName:"private user",
      userII: this.afAuth.auth.currentUser.uid,
      Timestamp:firestore.FieldValue.serverTimestamp(),
      photoURL:''})
  })
  this.nav.navigateForward('/login/chat')
 }

 login()
 {
 this.afAuth.auth.signInWithEmailAndPassword(this.Email,this.pdw).then(()=>{
   this.nav.navigateForward('/login/chat')
 }).catch(err=>{
   alert(err.message);
 })
 }

 showMessage(type, msg) {
  this.responseMessageType = type;
  this.responseMessage = msg;
  setTimeout(() => {
    this.responseMessage = "";
  }, 2000);
}

 forgotPassword() {
  this.chatapp.sendPasswordResetEmail(this.Email)
    .then(res => {
      console.log(res);
      this.isForgotPassword = false;
      this.showMessage("success", "Please Check Your Email");
    }, err => {
      this.showMessage("danger", err.message);
    });
  }

  ngIfCtrl(){
    this.hide = !this.hide;
  }
}