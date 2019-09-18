import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';

interface user{
  name: string;
  uid:string;
}

export interface Post{
  info: string;
  data1:string;
  }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersDoc: AngularFirestoreDocument<User>;
  private user:user
  private posts:Post
  
  
  constructor(private afauth:AngularFireAuth,
    private anfs:AngularFirestore,private route:Router, private nav: NavController) {
      afauth.auth.onAuthStateChanged((user)=>{
        if(user){
          this.nav.navigateRoot("login");
        }else{
          this.nav.navigateRoot("");
        }
      })
     }

     async  Anonymous(): Promise <firebase.auth.UserCredential> {
      return await firebase.auth().signInAnonymously();
    }

     getUser(key){
      this.usersDoc = this.anfs.doc<User>('user/' + key);
      return this.usersDoc.valueChanges();
    }

    update(User, key){
    this.usersDoc = this.anfs.doc<User>('user/'+ key);
    this.usersDoc.update(User);
   }

    setUser(user:user){
      this.user=user
         
        }
      
        getUID(){
      
          if(!this.user){
            if(this.afauth.auth.currentUser){
              const user=this.afauth.auth.currentUser
              this.setUser({
                name:user.email.split('0')[0],
                uid:user.uid
              })
      
           return user.uid
             }else{
              throw new Error("user not logged in")
            }
      
          }else{
      
            return this.user.uid
           }
      
           return this.user.uid
        }
      
      
        getPost(posts:Post){
          this.posts= posts
        }
      
        getInfo(){
          if(!this.posts){
            if(this.afauth.auth.currentUser){
              const post=this.afauth.auth.currentUser
              this.getPost({
                info:this.posts.data1.split('0')[0],
                data1:this.posts.data1
      
      
              })
      
              return this.posts.info
            }
          }
        }  
}
