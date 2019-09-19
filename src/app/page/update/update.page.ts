import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/servece/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

    User = {
      key: '',
      Gender: '',
      displayName: '',
      photoURL: '',
      userII: '',
  }
  
  constructor(private route:ActivatedRoute, private nav:Router, private service: AuthService, private afAuth: AngularFireAuth, public Storage: AngularFireStorage) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params)

      this.User.userII = params.uid
      console.log(this.User.userII),

      this.User.Gender = params.Gender
      console.log(this.User.Gender),

      this.User.displayName = params.displayName
      console.log(this.User.displayName),

      this.User.photoURL = params.photoURL
      // console.log(this.User.photoURL)

    })
  }

  onUpdate(User){
    this.service.update(User, User.userII);
    alert("user updated");
    this.nav.navigateByUrl("login/profile");
  }

  onBack(){
    this.nav.navigateByUrl("login/profile");
  }

}
