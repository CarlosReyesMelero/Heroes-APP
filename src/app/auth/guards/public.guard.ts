import { inject } from '@angular/core';
import { Observable, of, tap, map } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap(isAuthenticated => {
      if (isAuthenticated) {
        router.navigate(['./']);
      }
    }),
    map(isAuthenticated => !isAuthenticated)
  );
};

export const canActivateGuardPublic: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('Can Activate')
  console.log({route, state})
  return checkAuthStatus();
};

export const canMatchGuardPublic: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('Can Match')
  console.log({route, segments})
  return checkAuthStatus();
};
