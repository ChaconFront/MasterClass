import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostType } from "./enums/post-type.enum";
import { PostStatus } from "./enums/postStatus.enum";
import { MetaOptions } from "src/meta-options/meta-options.entity";
import { User } from "src/users/user.entity";
import { Tags } from "src/tags/tags.entity";

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
    publishOn?: Date;

    //relacion bidireccional
    @OneToOne(()=>MetaOptions,(metaOptions)=>(metaOptions.post),{
        cascade:true, //nos permite eliminar e insertar datos en la en la tabla MetaOptions.
        eager:true,//obtener los meta options a la hora de obtener los post para asi a la hora de hacer consultas eliminar las relaciones.
    })
    metaOptions: MetaOptions;

    @ManyToOne(()=>User, (user) => user.post,{
        eager:true
    })
    author:User;


    @ManyToMany(()=>Tags,(tags)=>tags.post,{
        eager:true
    })
    @JoinTable()
    tags?: Tags[];
    

}