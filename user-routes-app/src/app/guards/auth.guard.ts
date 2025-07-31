import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  if(authService.isAuthenticated()){
    if(isTokenExpired()){
      authService.logout();
      router.navigate(['/login']);
      return false;
    }

    if(!authService.isAdmin()){
      router.navigate(['/forbidden']);
      return false;
    }

    return true;
  }


  router.navigate(['/login']);
  return false;
};

const isTokenExpired = () => {
  const payload = inject(AuthService).user;
  const exp = payload.exp;
  // por default es .getTime es en milisegundos y lo necesitamos en segundos por eso dividimos entre 1000
  const now = new Date().getTime() / 1000;
  return (now > exp) ? true  : false;
}
