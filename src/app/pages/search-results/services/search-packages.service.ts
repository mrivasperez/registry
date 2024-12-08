import { Injectable } from '@angular/core';
import { PackageSummary, SearchResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class SearchPackagesService {
  private apiUrl = 'https://registry.npmjs.org/-/v1/search';

  async searchPackages(query: string): Promise<PackageSummary[]> {
    try {
      const response = await fetch(`${this.apiUrl}?text=${query}`);
      const data: SearchResponse = await response.json();
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
      return results;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
