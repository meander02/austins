import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';
import { ERol } from 'src/app/shared/constants/rol.enum';

@Injectable({
  providedIn: 'root'
})
export class isAdminGuard implements CanActivate {


  constructor(private sessionService:SessionService,private router:Router)
  {

  }
 canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.sessionService .getRol()=== ERol.ADMIN) {
        return true;
      }
        this.router.navigateByUrl('/portal');
        return false;

    }

}
