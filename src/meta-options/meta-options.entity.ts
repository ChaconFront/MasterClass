import { Post } from "src/post/post.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MetaOptions{

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({
        type:'json',
        nullable:false
    })
    metaValue:string;

    @CreateDateColumn()
    createDate:Date;
    @UpdateDateColumn()
    updateDate:Date;

    //relacion de uno a uno bidireccional.
    @OneToOne(()=>Post,(post)=>post.metaOptions)
    post: Post;

}