export interface Product {
    id: string;
    name: string;
    image: string;
    type: string;
    variations: string[];
    details: string;
}

export interface ProductInCart extends Product {
    selectedVariation: string;
    quantity: number;
}

