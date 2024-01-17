import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class isAuthenticatedGuard implements CanActivate {


  constructor(private sessionService:SessionService,private router:Router)
  {

  }
 canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.sessionService.isAutenticated()){
        return true
      }else{
        this.router.navigateByUrl('/portal/home')
      }
      return false
    }

}
