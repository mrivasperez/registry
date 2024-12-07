import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageDetails } from './types';
import { MarkdownModule } from 'ngx-markdown';
@Component({
  selector: 'app-package-info',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './package-info.component.html',
  styleUrl: './package-info.component.css',
})
export class PackageInfoComponent {
  title = '';
  data: PackageDetails | undefined;

  constructor(@Inject(ActivatedRoute) private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      const packageName = params.get('packageName');
      if (packageName) {
        this.title = `${packageName}`;
        document.title = packageName;
        // Fetch data using vanilla JavaScript
        fetch(`https://registry.npmjs.org/${this.title}`)
          .then((response) => response.json())
          .then((data) => {
            this.data = data;
            console.log('Data fetched:', this.data);
          })
          .catch((error) => console.error('Error fetching data:', error));
      } else {
        console.warn('Package name not found in the URL.');
      }
    });
  }
}
