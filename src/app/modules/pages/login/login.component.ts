import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/system/api.services';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiService]
})
export class LoginComponent implements OnInit {

    loading = false;
    form:any = {};
    constructor(
        private router: Router,
        private mainService: ApiService,
    ) { }

    ngOnInit() {
    }

    login() {
      this.loading = true;
      
      this.mainService.authenticationLogin('login', this.form)
          .subscribe(
              (data:any) => {
                this.loading = false;
                this.router.navigate(['/pages/list']);
              },
              error => {
                  console.log(error.error.error);
                  this.loading = false;
              },
      );


    }

}
