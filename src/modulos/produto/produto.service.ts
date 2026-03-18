import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutoEntity } from './produto.entity';
import { ListaProdutoDTO } from './dto/ListaProduto.dto';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criar(dadosProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();

    Object.assign(produtoEntity, dadosProduto);

    return this.produtoRepository.save(produtoEntity);
  }
  async listar() {
    const produtos = await this.produtoRepository.find({
      relations: {
        caracteristicas: true,
        imagens: true,
      },
    });

    const listaProdutos: ListaProdutoDTO[] = produtos.map((produto) => {
      return new ListaProdutoDTO(
        produto.id,
        produto.nome,
        produto.caracteristicas,
        produto.imagens,
      );
    });

    return listaProdutos;
  }

  async listaUmProduto(id: string) {
    const produtoSalvo = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        imagens: true,
        caracteristicas: true,
      },
    });

    if (produtoSalvo === null) {
      throw new NotFoundException('O produto não foi encontrado');
    }

    const listaProduto = new ListaProdutoDTO(
      produtoSalvo.id,
      produtoSalvo.nome,
      produtoSalvo.caracteristicas,
      produtoSalvo.imagens,
    );

    return listaProduto;
  }

  async atualizar(id: string, novosDados: AtualizaProdutoDTO) {
    const produtoAtualizado = await this.produtoRepository.findOneBy({ id });

    if (produtoAtualizado === null) {
      throw new NotFoundException('Produto nao encontrado');
    }

    Object.assign(produtoAtualizado, novosDados as ProdutoEntity);

    return this.produtoRepository.save(produtoAtualizado);
  }

  async deletar(id: string) {
    const produtoRemovido = await this.produtoRepository.delete(id);

    if (!produtoRemovido.affected) {
      throw new NotFoundException('Produto nao encontrado');
    }

    return produtoRemovido;
  }
}
