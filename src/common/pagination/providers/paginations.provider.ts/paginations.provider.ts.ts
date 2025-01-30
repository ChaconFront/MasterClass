import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../../dto/paginations-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Paginated } from '../../interfaces/paginate.interface';


@Injectable()
export class PaginationsProvider {

    constructor(

        @Inject(REQUEST)
        private readonly request: Request,
    ){}
    //este metodo es un generico que nos va a servir para buscar en una tabla especifica de la base de datos, a traves
    //de los parametros paginationQuery y el repository un ejemplo de esto esta implementado en el servico de postService.
    public async paginateQuery<T extends ObjectLiteral>(paginationQuery:PaginationQueryDto, repository: Repository<T>): Promise<Paginated<T>>{

        const result = await repository.find({ 
             skip:(paginationQuery.page-1) * paginationQuery.limit,
             take:paginationQuery.limit
           })
     
           /* create request url */ 
           //obtener la url base de la api con la request de express
           const baseUrl=this.request.protocol +'://'+ this.request.headers.host +'/';

           const newUrl= new URL(this.request.url, baseUrl)

          // console.log(newUrl)

           /* calculando el numero de pagina */
           const totalItems= await repository.count();
           const totalPages= Math.ceil(totalItems/paginationQuery.limit)// redondea hacia arriba el numero entero mas cercano.
           const nextPage= paginationQuery.page=== totalPages ? paginationQuery.page : paginationQuery.page + 1;
           const previusPage= paginationQuery.page=== 1 ? paginationQuery.page : paginationQuery.page - 1;

 
           const finalResponse: Paginated<T>={
            data: result,
            meta: {
                itemsPerPage: paginationQuery.limit,
                totalItems: totalItems,
                currentPage: paginationQuery.page,
                totalpages:totalPages,
            },
            links:{
                first:`${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=1`,
                last:`${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
                current:`${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
                next:`${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
                previus:`${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${previusPage}`,

            }

           }
           console.log(finalResponse)

         return finalResponse;


    }
}
