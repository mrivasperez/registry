interface PackageAuthor {
  email: string;
  name: string;
}

export interface PackageDetails {
  name: string;
  description: string;
  readme: string;
  author: PackageAuthor;
  maintainers: PackageAuthor[];
  license: string;
}