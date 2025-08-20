import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole();

    if (role === 'Admin') {
      return true;
    }

    // Nếu không có quyền thì chuyển hướng
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
