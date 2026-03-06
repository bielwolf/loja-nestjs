import { Column, Entity } from "typeorm";

@Entity({ name: 'produto_caracteristicas' })
export class CaracteristicaProduto {

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'descricao', length: 1000 ,nullable: false })
  descricao: string;
}