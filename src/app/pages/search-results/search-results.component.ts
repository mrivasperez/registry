import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageSummary } from './services/types';
import { SearchPackagesService } from './services/search-packages.service';

@Component({
  selector: 'app-search-results',
  imports: [],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent implements OnInit {
  results: PackageSummary[] | undefined = undefined;
  searchTerm = '';
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private searchPackagesService: SearchPackagesService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      // Use optional chaining for safety
      this.searchTerm = params['query'] || ''; 

      if (this.searchTerm) {
        this.isLoading = true;
        this.searchPackagesService
          .searchPackages(this.searchTerm)
          .then((results) => {
            this.results = results;
            this.isLoading = false;
            console.log('Data fetched:', this.results);
          })
          .catch((error) => {
            this.isLoading = false;
            this.errorMessage = 'Error fetching data. Please try again later.';
            console.error('Error fetching data:', error);
          });
      }
    });
  }
}
