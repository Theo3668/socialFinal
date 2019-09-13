import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/servece/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

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
  }

  constructor(private route:ActivatedRoute, private nav:Router, private service: AuthService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params)

      this.User.key = params.key
      console.log(this.User.key),

      this.User.Gender = params.Gender
      console.log(this.User.Gender),

      this.User.displayName = params.displayName
      console.log(this.User.displayName),

      this.User.photoURL = params.photoURL
      // console.log(this.User.photoURL)

    })
  }

  onUpdate(User){
    const key = this.afAuth.auth.currentUser.uid;

    this.service.update(User, User.key);
    alert("user updated");
  }

  onBack(){
    this.nav.navigateByUrl("login/profile");
  }

}
