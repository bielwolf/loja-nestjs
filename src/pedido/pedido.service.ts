import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { In, Repository } from 'typeorm';
import { StatusPedido } from './enum/statuspedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './itemPedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async cadastrarPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    const produtosIds = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId,
    );

    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(produtosIds),
    });
    const pedido = new PedidoEntity();

    pedido.status = StatusPedido.EM_PROCESSAMENTO;
    pedido.usuario = usuario;

    const itensPedidoEntidade = dadosDoPedido.itensPedido.map((item) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === item.produtoId,
      );
      const itemPedido = new ItemPedidoEntity();

      itemPedido.quantidade = item.quantidade;
      itemPedido.produto = produtoRelacionado;
      itemPedido.precoVenda = produtoRelacionado.valor;
      itemPedido.produto.quantidadeDisponivel -= itemPedido.quantidade;
      return itemPedido;
    });

    const valorTotal = itensPedidoEntidade.reduce((acumulador, item) => {
      return acumulador + item.precoVenda * item.quantidade;
    }, 0);

    pedido.valorTotal = valorTotal;
    pedido.itensPedido = itensPedidoEntidade;

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
