import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the session has token.
    if (!sessionStorage.getItem('token')) {
      return false;
    }

	  return true;
  }
}
