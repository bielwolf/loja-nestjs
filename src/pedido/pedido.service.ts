import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { Repository } from 'typeorm';
import { StatusPedido } from './enum/statuspedido.enum';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async cadastrarPedido(usuarioId: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    const pedido = new PedidoEntity();

    pedido.valorTotal = 0;
    pedido.status = StatusPedido.EM_PROCESSAMENTO;
    pedido.usuario = usuario;

    const pedidoSalvo = await this.pedidoRepository.save(pedido);
    return pedidoSalvo;
  }

  async obtemPedidosDeUsuario(usuarioId: string) {
    return await this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
      },
    });
  }
}
