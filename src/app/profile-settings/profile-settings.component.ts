import { Component, OnInit } from '@angular/core';
import { IProfile, ProfileService } from './profile.service';

enum SaveStatus {
  NOTSTARTED,
  SAVING,
  SUCCESSFUL,
  ERROR
}

@Component({
  selector: 'bf-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  public title = 'Profile';
  public user: IProfile;
  public firstNameInputValue: string = '';
  public lastNameInputValue: string = '';

  public isProfileLoading: boolean;
  public SaveStatusEnum = SaveStatus;
  public saveStatus: SaveStatus = SaveStatus.NOTSTARTED;
  public errorResultMessage: string;

  constructor(private profile: ProfileService) { }
  
  ngOnInit() {    
    this.getProfile();
   }
  
  saveProfile() { 
    this.saveStatus = SaveStatus.SAVING;
    this.profile.setName(this.firstNameInputValue, this.lastNameInputValue).then(
      resolve => {
        this.user.firstName = this.firstNameInputValue;
        this.user.lastName = this.lastNameInputValue;
        this.saveStatus = SaveStatus.SUCCESSFUL;
      },
      reject => { 
        this.firstNameInputValue = this.user.firstName;
        this.lastNameInputValue = this.user.lastName;
        this.errorResultMessage = reject.error;
        this.saveStatus = SaveStatus.ERROR;
      }
    );
  }

  getProfile() {
    this.isProfileLoading = true;
    this.profile.getProfileUser().then(
      resolve => { 
        this.user = resolve;
        this.firstNameInputValue = this.user.firstName;
        this.lastNameInputValue = this.user.lastName;
        this.isProfileLoading = false;
      },
      reject => this.getProfile()
    );
  }

  onFirstNameFieldChange(event) {
    this.saveStatus = SaveStatus.NOTSTARTED;
    this.firstNameInputValue = event.srcElement.value;
  }

  onLastNameFieldChange(event) {
    this.saveStatus = SaveStatus.NOTSTARTED;
    this.lastNameInputValue = event.srcElement.value;
  }

}
