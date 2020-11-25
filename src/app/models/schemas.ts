export class User {
  // tslint:disable-next-line: variable-name
  _id: string;
  username: string;
  email: string;
  password: string;
  // public  date: Date;
  mode: boolean;
}

export interface LoginRsp {
  success: boolean;
  status: string;
  token: string;
}


export class Store {
    // tslint:disable-next-line: variable-name
    _id: string;
    name: string;
    image: string;
    contact: string;
    license: string;
    address: string;
    city: string;
    province: string;
    date: Date;
    userId: string;
  }
/*
This Schema is used to get all
the medicines register in the
inventory
*/
export class Medicine {
    // tslint:disable-next-line: variable-name
    _id: string;
    medicinename: string;
    formula: string;
    format: string;
    ingredients: string;
    image: string;
}
/*
This Schema is used to get all
the medicines related to the
Store inventory
*/
export class StoreMedicine {
  id: string;
  medicinename: string;
  image: string;
  formula: string;
  format: string;
  ingredients: number;
  quantity: number;
  price: number;
  storeId: string;
}

export class Cart {
  // tslint:disable-next-line: variable-name
  userId: string;
  storeId: string;
  medicineId: string;
  quantity: number;
}
export class CartB {
  // tslint:disable-next-line: variable-name
  _id: string; // cartId
  medicineId: string;
  medicinename: string;
  image: string;
  formula: string;
  format: string;
  ingredients: number;
  quantity: number;
  price: number;
}
