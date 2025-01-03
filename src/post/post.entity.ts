import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PostType } from "./enums/post-type.enum";
import { PostStatus } from "./enums/postStatus.enum";
import { MetaOptionsDto } from "./dtos/create-post-metaOptions.dto";

@Entity()
export class Post{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:'varchar',
        length:'512',
        nullable:false      
    })
    title:string;

    @Column({
        type:'enum',
        enum:PostType,
       nullable:false,
       default:PostType.POST
    })
    posType:PostType;

    @Column({
        type:'varchar',
        length:'256',
        nullable:false,
    })
    slug: string;
    
    @Column({
        type:'enum',
        enum:PostStatus,
       nullable:false,
       default:PostStatus.DRAFT
    })
    status:PostStatus;

    @Column({
        type:'text',
        nullable:false
    })
    content?:string;

    @Column({
        type:'text',
        nullable:false
    })
    schema?:string;

    @Column({
        type:'varchar',
        length:'1024',
        nullable:true
    })
    feactureImageUrl: string;

    @Column({
        type:'timestamp',//es como el tiempo que se almaceno en base de datos
        nullable:true
    })
    publishOn: Date;

    
    tags?: string[];
     metaOptions: MetaOptionsDto[];

}