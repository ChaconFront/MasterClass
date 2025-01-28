export interface Paginated<T>{
    data:T[];
    meta:{
        itemsPerPage:number,
        totalItems:number,
        currentPage:number,
        totalpages:number,
    };

    links:{
        first:string,
        last:string,
        current:string,
        next:string,
        previus:string,

    }
}