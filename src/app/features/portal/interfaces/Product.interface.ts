
export interface IproductResponse
{
  _id: string;
  sku: string;
  name: string;
  description: string;
  unit: string;
  expiration: string;
  model: string;
  quantity: number;
  price: number;
  category: string;
  maker: string;
  images: string[];
  status: string;
  weight: number;
  ingredients: string[];
  allergens: string[];
  nutritionalInformation: string;
  isFeatured: boolean;
  isVegetarian: boolean;
  isGlutenFree: boolean;
}

