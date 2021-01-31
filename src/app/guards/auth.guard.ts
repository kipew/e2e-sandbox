import { AuthorizationService } from 'src/app/services/authorization.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, UrlSegment, Route, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(
    private authService: AuthorizationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const isAuthorized: boolean = this.authService.isLogedIn$.getValue();
    return isAuthorized ? true : this.router.createUrlTree(['home']);
  }

  canLoad(route: Route, segment: UrlSegment[]): boolean {
    return this.authService.isLogedIn$.getValue();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authService.isLogedIn$.getValue();
  }
}
