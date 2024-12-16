import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageDetails } from './types';
import { MarkdownModule } from 'ngx-markdown';
import { PackageInfoService } from './services/package-info.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { ErrorComponent } from '../../shared/error/error.component';

@Component({
  selector: 'app-package-info',
  imports: [MarkdownModule, LoadingComponent, ErrorComponent],
  templateUrl: './package-info.component.html',
})
export class PackageInfoComponent implements OnInit {
  title = '';
  data: PackageDetails | undefined;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private packageInfoService: PackageInfoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const packageName = decodeURIComponent(String(params.get('packageName')));
      if (packageName) {
        this.title = `${packageName}`;
        document.title = packageName;

        this.isLoading = true;
        this.packageInfoService
          .getPackageDetails(packageName)
          .then((data) => {
            this.data = data;
            this.isLoading = false;
            console.log('Data fetched:', this.data);
          })
          .catch((error) => {
            this.isLoading = false;
            this.errorMessage =
              'Error fetching package details. Please try again later.';
            console.error('Error fetching package details:', error);
          });
      } else {
        console.warn('Package name not found in the URL.');
      }
    });
  }
}
