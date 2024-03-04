import { IproductResponse } from '../interfaces/Product.interface';

export class ProductDetail {
  _id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  quantity: number;
  category: string;
  maker: string;
  status: string;
  weight: number;
  ingredients: string[];
  allergens: string[];
  nutritionalInformation: string;
  isFeatured: boolean;
  isVegetarian: boolean;
  isGlutenFree: boolean;

  constructor(data?: IproductResponse) {
    this._id = data?._id ? data._id : '';
    this.sku = data?.sku ? data.sku : '';
    this.name = data?.name ? this.getNameUpperCase(data.name) : '';
    this.description = data?.description ? data.description : '';
    this.price = data?.price ? data.price : 0;
    this.images = data?.images ? data.images : [];
    this.quantity = data?.quantity ? data.quantity : 0;
    this.category = data?.category ? data.category : '';
    this.maker = data?.maker ? data.maker : '';
    this.status = data?.status ? data.status : '';
    this.weight = data?.weight ? data.weight : 0;
    this.ingredients = data?.ingredients ? data.ingredients : [];
    this.allergens = data?.allergens ? data.allergens : [];
    this.nutritionalInformation = data?.nutritionalInformation ? data.nutritionalInformation : '';
    this.isFeatured = data?.isFeatured ? data.isFeatured : false;
    this.isVegetarian = data?.isVegetarian ? data.isVegetarian : false;
    this.isGlutenFree = data?.isGlutenFree ? data.isGlutenFree : false;
  }

  getNameUpperCase(name: string): string {
    return name.toUpperCase();
  }
}
