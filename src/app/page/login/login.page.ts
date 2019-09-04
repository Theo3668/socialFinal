import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, firestore } from 'firebase/app';

import {AngularFirestore} from '@angular/fire/firestore';
import { AuthService } from 'src/app/servece/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
