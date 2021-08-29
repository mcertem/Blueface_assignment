import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface IProfile {
  firstName: string;
  lastName: string;
  username: string;
  age: number;
  email: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public user: IProfile;

  constructor(private translateService: TranslateService) { }

  getProfileUser(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user = {
            firstName: 'Michael',
            lastName: 'Collins',
            username: 'michael.collins',
            age: 30,
            email: 'zem2000@gmail.com'
          };
          resolve(this.user);
        } else {
          reject({ error: this.translateService.instant('profileBackendMessages.ProfileNotFound') });
        }
      }, Math.random() * 5000);
    });
  }

  setName(firstName: string, lastName: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user.firstName = firstName;
          this.user.lastName = lastName;
          this.setEmail().then(
            result => resolve(this.user),
            err => reject({ error: this.translateService.instant('profileBackendMessages.ErrorOnEmailGeneration') })
          );          
        } else {
          reject({ error: this.translateService.instant('profileBackendMessages.InvalidName') });
        }
      }, Math.random() * 5000);
    });
  }

  setEmail() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user.email = this.user.firstName.replace(/\s/g, '') + '.' + this.user.lastName.replace(/\s/g, '') + '@blueface.com';
          resolve(this.user);
        } else {
          reject();
        }
      }, Math.random() * 1000);
    });
  }
}
