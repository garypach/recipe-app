import { Component, OnInit,Input } from '@angular/core';
import { profilePostData } from 'src/app/pages/profile-feed/profile-feed.component';
@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss']
})
export class ProfilePostsComponent implements OnInit {
  @Input() postData?: profilePostData;

  constructor() { }

  ngOnInit(): void {
  }

}
