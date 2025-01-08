import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostType } from "./enums/post-type.enum";
import { PostStatus } from "./enums/postStatus.enum";
import { MetaOptions } from "src/meta-options/meta-options.entity";

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

    @OneToOne(()=>MetaOptions,{
        cascade:true, //nos permite eliminar e insertar datos en la en la tabla MetaOptions.
        eager:true,//obtener los meta options a la hora de obtener los post para asi a la hora de hacer consultas eliminar las relaciones.
    })
    @JoinColumn()
    metaOptions: MetaOptions;

    tags?: string[];
    

}