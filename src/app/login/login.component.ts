import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from '../services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  save;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: Service,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: Boolean
    });
    this.loginForm.setValue({
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
      remember: false
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    let data = {
      username: this.f.username.value,
      password: this.f.password.value
    }
    this.service.login(data)
      .subscribe(
        data => {
          if (this.f.remember.value != false) {
            localStorage.setItem('username', this.f.username.value);
            localStorage.setItem('password', this.f.password.value);
          } else {
            localStorage.clear();
          }
          this.router.navigate(['/order']);
        },
        error => {
          this.loading = false;
        });
  }
}