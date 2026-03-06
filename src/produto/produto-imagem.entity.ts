import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'prduto_imagens' })
export class ImagemProduto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'url', nullable: false })
    url: string;

    @Column({ name: 'descricao', length: 1000, nullable: false })
    descricao: string;
}
