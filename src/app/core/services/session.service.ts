import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './storage.service';
import { Iuser } from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private helper = new JwtHelperService();

  get token(){
    return this.storageService.getToken()
  }
  constructor(private storageService: StorageService) {}



  getUserData(): Iuser | undefined {
    if(this.token){
      return  (this.helper.decodeToken(this.token)!)
    }
    return undefined; // Devuelve undefined en caso de que no haya un token

  }

  getRol(): string{
    return this.getUserData()!.rol
  }
  isAutenticated(): boolean {
    debugger
    return !!this.token && !this.isTokenExpired();
  }


  isTokenExpired(): boolean{
    return this.helper.isTokenExpired(this.token)
  }
}
