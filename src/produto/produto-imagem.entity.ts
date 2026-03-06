import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProdutoEntity } from "./produto.entity";

@Entity({ name: 'prduto_imagens' })
export class ImagemProdutoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'url', nullable: false })
    url: string;

    @Column({ name: 'descricao', length: 1000, nullable: false })
    descricao: string;

    @ManyToOne(() => ProdutoEntity, (produto) => produto.caracteristicas, {orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    produto: ProdutoEntity
}
