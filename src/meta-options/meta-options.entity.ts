import { Post } from "src/post/post.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    /* onDelete:'Cascade' significa que si una instancia de Post es eliminada,
     automáticamente se eliminará la instancia de la entidad actual
      (que contiene este código) que está relacionada con ella.
     Esto ayuda a mantener la integridad referencial en la base de datos. */
    @OneToOne(()=>Post,(post)=>post.metaOptions,{
        onDelete:'CASCADE'
    })
    @JoinColumn()
    post: Post;

}