import { Injectable } from '@angular/core';
import { PackageDetails } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PackageInfoService {
  private apiUrl = 'https://registry.npmjs.org';

  async getPackageDetails(packageName: string): Promise<PackageDetails> {
    try {
      const response = await fetch(`${this.apiUrl}/${packageName}`);
      const data: PackageDetails = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching package details:', error);
      throw error;
    }
  }
}
