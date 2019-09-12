import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servece/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  uid: string;
  chatRef: any;
  itemList: any;

  constructor(private afAuth: AngularFireAuth, private fire:AngularFirestore,
    private alert:AlertController,private route:Router,
    private chatapp:AuthService, private nav:NavController) {

      this.uid =this.afAuth.auth.currentUser.uid;
      this.chatRef = this.fire.collection('user').snapshotChanges().subscribe(data =>{
      this.itemList = data.map ( e => {
        return{
          displayName: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as User;
      });
      console.log(this.itemList);
     })
    }

  ngOnInit() {
  }

}
