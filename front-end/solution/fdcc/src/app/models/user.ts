export class User {
    user_id: string;
    first_name: string;
    last_name: string;
    address: {
        address1:string;
        address2:string;
        city:string;
        state:string;
        zip:string;
      }
    gender: string;
    age: string;
    order_total: {
        amount:string;
        currency:string;

      }

}