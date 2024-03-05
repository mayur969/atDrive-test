import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  data: any;
  filter = {
    name: "",
    email: ""
  }
  users: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getData(environment.endpoint).subscribe({
      next: (res) => {
        this.data = res;
        this.users = this.data
        console.log(this.data);
      },
      error: (error) => {
        console.error('Error occurred:', error);
        if (error.status === 404) {
          console.log('Data Not Found');
        } else if (error.status === 401) {
          console.log('Unauthorized Access');
        } else if (error.status === 500) {
          console.log('Internal Server Error');
        } else if (error.status === 503) {
          console.log('Service Unavailable');
        } else if (error.status === 504) {
          console.log('Gateway Timed Out');
        } else {
          console.log('Unexpected error');
        }
      }
    });
  }

  get filteredUsers() {
    const name = this.filter.name.toLowerCase();
    const email = this.filter.email.toLowerCase();

    if (!name && !email) {
      return this.users;
    } else {
      return this.users.filter(user =>
        user.name.toLowerCase().includes(name) && user.email.toLowerCase().includes(email)
      );
    }
  }


}
