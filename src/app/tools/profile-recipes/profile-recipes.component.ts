import { Component, OnInit,Input } from '@angular/core';
import { profileRecipeData } from 'src/app/pages/profile-feed/profile-feed.component';
@Component({
  selector: 'app-profile-recipes',
  templateUrl: './profile-recipes.component.html',
  styleUrls: ['./profile-recipes.component.scss']
})
export class ProfileRecipesComponent implements OnInit {
  @Input() recipeData: profileRecipeData;

  constructor() { }

  ngOnInit(): void {
  }

}
