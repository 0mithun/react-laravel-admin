export class Product{
    id : number;
    title: string;
    image: string;
    description: string;
    price : number;

    constructor(id =0, title ='', image = '', description = '',price = 0 ){
        this.id = id;
        this.description = description;
        this.title = title;
        this.image = image;
        this.price = price;
    }

}
