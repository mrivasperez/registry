import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  searchTerm = new FormControl('');
  constructor(private router: Router) {}
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
