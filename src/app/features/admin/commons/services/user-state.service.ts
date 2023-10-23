import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private isAdminSection = false;
  constructor() {

   }

  setIsAdminSection(isAdmin: boolean) {
    this.isAdminSection = isAdmin;
  }

  getIsAdminSection(): boolean {
    return this.isAdminSection;
  }
}
