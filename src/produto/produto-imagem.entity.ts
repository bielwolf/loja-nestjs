import { Column, Entity } from "typeorm";

@Entity({ name: 'prduto_imagens' })
export class ImagemProduto {

    @Column({ name: 'url', nullable: false })
    url: string;

    @Column({ name: 'descricao', length: 1000, nullable: false })
    descricao: string;
}
