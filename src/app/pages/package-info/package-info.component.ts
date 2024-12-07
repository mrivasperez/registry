import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-package-info',
  imports: [],
  templateUrl: './package-info.component.html',
  styleUrl: './package-info.component.css',
})
export class PackageInfoComponent {
  title = '';

  constructor(@Inject(ActivatedRoute) private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      const packageName = params.get('packageName');
      this.title = `Package: ${packageName}`;
    });
  }
}
