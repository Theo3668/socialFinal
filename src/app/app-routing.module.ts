import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './guard.guard';
import { LoginPage } from './page/login/login.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', component: LoginPage, children:[{ path: 'chat', loadChildren: './page/chat/chat.module#ChatPageModule',canActivate:[GuardGuard ] },
                                                   { path: 'profile', loadChildren: './page/profile/profile.module#ProfilePageModule' },
                                                   { path: 'users', loadChildren: './page/users/users.module#UsersPageModule' },
] },  { path: 'update', loadChildren: './page/update/update.module#UpdatePageModule' },
  { path: 'message', loadChildren: './page/message/message.module#MessagePageModule' },

  

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
