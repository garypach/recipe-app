import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {MatButtonModule} from '@angular/material/button'; 
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FirebaseTSApp} from 'firebasets/firebasetsApp/firebaseTSApp'
import { environment } from 'src/environments/environment';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card'
import {MatBottomSheet, MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { ProfileComponent } from './tools/profile/profile.component'
import {MatDialogModule} from '@angular/material/dialog'
import {MatIconModule} from '@angular/material/icon';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { CreatePostComponent } from './tools/create-post/create-post.component';
import { PostsComponent } from './tools/posts/posts.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProfileFeedComponent } from './pages/profile-feed/profile-feed.component';
import { ProfilePostsComponent } from './tools/profile-posts/profile-posts.component';
import { CreatRecipeComponent } from './tools/creat-recipe/creat-recipe.component'
import {MatTabsModule} from '@angular/material/tabs';
import { ProfileRecipesComponent } from './tools/profile-recipes/profile-recipes.component'; 
import {MatMenuModule} from '@angular/material/menu'; 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticatorComponent,
    ProfileComponent,
    PostFeedComponent,
    CreatePostComponent,
    PostsComponent,
    HeaderComponent,
    ProfileFeedComponent,
    ProfilePostsComponent,
    CreatRecipeComponent,
    ProfileRecipesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

constructor(){
  FirebaseTSApp.init(environment.firebaseConfig)
}
}
