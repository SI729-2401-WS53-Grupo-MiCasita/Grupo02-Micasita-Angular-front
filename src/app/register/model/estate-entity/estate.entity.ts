export class Estate {
  id?: number;
  title: string;
  owner: string;
  sale_or_rent: string;
  district: string;
  year: string;
  description: string;
  price: string;
  thumbnail: string;

  constructor() {
    this.title = "";
    this.owner = "";
    this.sale_or_rent = "";
    this.district = "";
    this.year = "";
    this.description = "";
    this.price = "";
    this.thumbnail = "";
  }
}
