export class Filter{
    name : string;
    stars : Array<number>;

    constructor(_name: string , _stars: Array<number>){
        this.name = _name;
        this.stars = _stars;
    }
}