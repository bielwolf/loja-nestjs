import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CaracteristicaProdutoEntity } from './produto-caracteristicas.entity';
import { ImagemProdutoEntity } from './produto-imagem.entity';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', nullable: false })
  usuarioId: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'valor', nullable: false })
  valor: number;

  @Column({ name: 'quantidade_disponivel', nullable: false })
  quantidadeDisponivel: number;

  @Column({ name: 'descricao', length: 1000, nullable: false })
  descricao: string;

  @Column({ name: 'categoria', nullable: false, length: 100 })
  categoria: string;

  @OneToMany(
    () => CaracteristicaProdutoEntity,
    (caracteristicasProdutoEntity) => caracteristicasProdutoEntity.produto,
    { cascade: true, eager: true },
  )
  caracteristicas: CaracteristicaProdutoEntity[];

  @OneToMany(
    () => ImagemProdutoEntity,
    (ImagemProdutoEntity) => ImagemProdutoEntity.produto,
    { cascade: true, eager: true },
  )
  imagens: ImagemProdutoEntity[];

  @CreateDateColumn({ name: 'create_at' })
  createAt: string;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: string;

  @DeleteDateColumn({ name: 'delete_at' })
  deleteAt: string;
  quantidade: any;
}
