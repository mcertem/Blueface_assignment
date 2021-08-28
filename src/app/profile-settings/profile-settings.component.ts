import { Component, OnInit } from '@angular/core';
import { IProfile, ProfileService } from './profile.service';

@Component({
  selector: 'bf-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  public title = 'Profile';
  public user: IProfile;
  constructor(private profile: ProfileService) { }
  ngOnInit() { }
  saveProfile() { }

}
