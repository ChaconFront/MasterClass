import { Exclude } from "class-transformer";
import { Post } from "src/post/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{

@PrimaryGeneratedColumn()
id:number;

@Column({
    type:'varchar',
    length:'96',
    nullable:false
})
firstName:string;

@Column({
    type:'varchar',
    length:'96',
    nullable:false
})
lastName:string;

@Column({
    type:'varchar',
    length:'96',
    nullable:false,
    unique:true
})
email:string;

@Column({
    type:'varchar',
    length:'96',
    nullable:true
})
@Exclude()
password?:string;

@Column({
    type:'varchar',
    nullable:true
})
@Exclude()
googleID?: string
//relacion bidireccional
@OneToMany(()=>Post,(post) => post.author)
post:Post[];


}