export class PaymentEntity {
  id?: number;
  owner_name: string;
  dni: number ;
  phone_number: string;
  email: string;
  amount: number  ;

  constructor() {
    this.owner_name = "";
    this.dni = 0;
    this.phone_number = "";
    this.email="";
    this.amount=0;
  }
}
