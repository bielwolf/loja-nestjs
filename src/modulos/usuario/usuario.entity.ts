import { PedidoEntity } from '../pedido/pedido.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'email', unique: true, nullable: false, length: 70 })
  email: string;

  @Column({ name: 'senha', length: 255, nullable: false })
  senha: string;

  @CreateDateColumn({ name: 'create_at' })
  createAt: string;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: string;

  @DeleteDateColumn({ name: 'delete_at' })
  deleteAt: string;

  @OneToMany(() => PedidoEntity, (pedido) => pedido.usuario)
  pedidos: PedidoEntity[];
}
