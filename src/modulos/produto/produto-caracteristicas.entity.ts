import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProdutoEntity } from "./produto.entity";

@Entity({ name: 'produto_caracteristicas' })
export class CaracteristicaProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'descricao', length: 1000 ,nullable: false })
  descricao: string;

  @ManyToOne(() => ProdutoEntity, (produto) => produto.caracteristicas, {orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  produto: ProdutoEntity;
}