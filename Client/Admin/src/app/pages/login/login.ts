import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Master } from '../../core/services/master';

@Component({
  selector: 'app-login',
  imports: [RouterModule,FormsModule,CommonModule],
  standalone : true,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = '';
  password: string = '';
  masterService = inject(Master);
  constructor(private router: Router) {

  }

loginUser() {
  if (this.email.trim() === '' || this.password.trim() === '') {
    alert('Please fill in all fields.');
    return;
  }

  const payload = { 
    email: this.email, 
    password: this.password 
  };

  this.masterService.loginUser(payload).subscribe({
    next: (res) => {
      if (res.success && res.user.role === 'admin') {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/dashboard/admin');
      } else {
        alert('❌ Invalid Email or Password');
      }
    },
    error: (err) => {
      console.error('Login failed:', err);
      alert('⚠️ Server error or invalid credentials');
    }
  });
}
}