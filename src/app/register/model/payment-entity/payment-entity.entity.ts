export class PaymentEntity {
  id?: number;
  owner_name: string;
  dni: number | null;
  phone_number: string;
  email: string;
  amount: number  ;

  constructor() {
    this.owner_name = "";
    this.dni = null;
    this.phone_number = "";
    this.email="";
    this.amount=0;
  }
}
