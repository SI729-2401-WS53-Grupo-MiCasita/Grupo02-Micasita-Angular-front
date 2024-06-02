export class Estate {
  id?: number;
  title: string;
  owner: string;
  sale_or_rent: string;
  district: string;
  yearbuilt: string;
  description: string;
  currency: string;
  price: string;
  thumbnail: string;
  type: string;
  size:string;
  bedrooms:number;
  bathrooms:number;
  garages:number;

  constructor() {
    this.title = "";
    this.owner = "";
    this.sale_or_rent = "";
    this.district = "";
    this.yearbuilt = "";
    this.description = "";
    this.currency = "";
    this.price = "";
    this.thumbnail = "";
    this.type= "";
    this.size="";
    this.bedrooms=0;
    this.bathrooms=0;
    this.garages=0;
  }
}
