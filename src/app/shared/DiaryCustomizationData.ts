
export interface PaperColorData {
    name: string;
    value: string;
    price: number;
    isActive: boolean;
}

export interface CoverThemeData {
    name: string;
    image: string;
    price: number;
    isActive: boolean;
}

export interface PaperTypeData {
    name: string;
    price: number;
    isActive: boolean;
}

export interface DiaryCustomizationData {
    name: string;
    basePrice: number;
    customization: {
        paperColor: PaperColorData[],
        coverTheme: CoverThemeData[],
        paperType: PaperTypeData[],
        hasCoverText: boolean
    };
}

export interface User {
  address: string;
  email: string;
  fullname: string;
  phone: string;
}

export interface Item {
  basePrice: number;
  customizations: Customization[];
  quantity: number;
}
export interface Customization {
  name: string;
  price: number;
  type: string;
}

export interface Order {
  createdAt: string;
  items: Item[];
  payment_method: string;
  total: number;
  user: User;
}
