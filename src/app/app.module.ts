import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// import { AngularFireModule } from '@angular/fire';
// import{AngularFirestoreModule} from '@angular/fire/firestore';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// import{AngularFireAuthModule} from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './servece/auth.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginPage } from './page/login/login.page';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Camera } from '@ionic-native/camera/ngx';

const firebaseConfig = {
  apiKey: "AIzaSyAF-0wsmuzTM0xohlqa-zSDuIm176AIjR0",
  authDomain: "socialfinal-92917.firebaseapp.com",
  databaseURL: "https://socialfinal-92917.firebaseio.com",
  projectId: "socialfinal-92917",
  storageBucket: "socialfinal-92917.appspot.com",
  messagingSenderId: "1045535296785",
  appId: "1:1045535296785:web:075c30ca8645b4d9"
};

@NgModule({
  declarations: [AppComponent,LoginPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
   HttpClientModule, AngularFireModule.initializeApp(firebaseConfig),
   AngularFireAuthModule,AngularFireStorageModule,HttpClientModule,AngularFirestoreModule.enablePersistence()],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
