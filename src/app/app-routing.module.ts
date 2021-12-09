import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { ProfileFeedComponent } from './pages/profile-feed/profile-feed.component';
const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'postfeed',
    component: PostFeedComponent
  },
  {
    path:'profile/:profilename',
    component: ProfileFeedComponent
  },
  {
    path:'**',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
