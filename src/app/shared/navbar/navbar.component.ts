import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  searchTerm = new FormControl('');
  constructor(private router: Router) {}
  handleHome() {
    this.searchTerm.reset();
  }
  onSearch(event: Event): void {
    const query = this.searchTerm.value;
    event.preventDefault(); // Prevent default form submission
    if (query) {
      this.router.navigate(['/search'], {
        queryParams: { query },
      });
    }
  }
}
