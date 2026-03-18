import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { In, Repository } from 'typeorm';
import { StatusPedido } from './enum/statuspedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './itemPedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';
import { AtualizaPedidoDto } from './dto/AtualizaPedido.dto';

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

  private async buscaUSuario(id: string) {
    console.log('ID recebido:', id);
    const usuario = await this.usuarioRepository.findOneBy({ id });
    console.log('Usuário encontrado:', usuario);
    if (usuario === null) {
      throw new NotFoundException('Usuário nao encontrado');
    }
    return usuario;
  }

  private trataDadosDoPedido(
    dadosDoPedido: CriaPedidoDTO,
    produtosRelacionados: ProdutoEntity[],
  ) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );
      if (produtoRelacionado === undefined) {
        throw new NotFoundException(
          `O produto com id ${itemPedido.produtoId} nao foi encontrado`,
        );
      }

      if (produtoRelacionado.quantidadeDisponivel < itemPedido.quantidade) {
        throw new NotFoundException(
          `O produto com id ${itemPedido.produtoId} nao tem quantidade suficiente`,
        );
      }
    });
  }

  async cadastrarPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.buscaUSuario(usuarioId);
    const produtosIds = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId,
    );

    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(produtosIds),
    });

    this.trataDadosDoPedido(dadosDoPedido, produtosRelacionados);

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
    const usuario = await this.buscaUSuario(usuarioId);

    return await this.pedidoRepository.find({
      where: {
        usuario: {
          id: usuario.id,
        },
      },
      relations: {
        usuario: true,
      },
    });
  }

  async atualizaPedido(id: string, dto: AtualizaPedidoDto, usuarioId: string) {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: { usuario: true },
    });

    if (pedido === null) {
      throw new NotFoundException('Pedido nao encontrado');
    }

    if (pedido.usuario.id !== usuarioId) {
      throw new NotFoundException('Pedido nao pertence ao usuário');
    }

    Object.assign(pedido, dto as PedidoEntity);

    return await this.pedidoRepository.save(pedido);
  }
}
