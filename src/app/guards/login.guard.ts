import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // Đã đăng nhập
      return true;
    } else {
      // Chưa đăng nhập -> chuyển về trang login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
