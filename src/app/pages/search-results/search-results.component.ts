import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageSummary, SearchResponse } from './services/types';

@Component({
  selector: 'app-search-results',
  imports: [],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent implements OnInit {
  results: PackageSummary[] | undefined = undefined;
  searchTerm = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['query'];
      this.searchTerm = searchTerm;
      console.log(searchTerm);

      if (searchTerm) {
        fetch(`https://registry.npmjs.org/-/v1/search?text=${searchTerm}`)
          .then((response) => response.json())
          .then((data: SearchResponse) => {
            // console.log(data.objects);
            const results = data.objects.map(
              ({ package: { name, description, version, keywords } }) => {
                return {
                  name,
                  description,
                  version,
                  keywords,
                };
              }
            );

            this.results = results;
          });
      }
    });
  }
}
