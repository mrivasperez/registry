export interface PackageSummary {
  name: string;
  version: string;
  description: string;
  keywords?: string[];
}


export interface SearchResponse {
  objects: {
    package: {
      name: string;
      description: string;
      version: string;
      keywords: string[];
    };
  }[];
}