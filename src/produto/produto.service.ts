import { Injectable } from '@nestjs/common';
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

    produtoEntity.nome = dadosProduto.nome;
    produtoEntity.valor = dadosProduto.valor;
    produtoEntity.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
    produtoEntity.descricao = dadosProduto.descricao;
    produtoEntity.categoria = dadosProduto.categoria;
    produtoEntity.caracteristicas = dadosProduto.caracteristicas;
    produtoEntity.imagens = dadosProduto.imagens;

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

  async atualizar(id: string, novosDados: AtualizaProdutoDTO) {
    const produtoAtualizado = await this.produtoRepository.update(
      id,
      novosDados,
    );
    return produtoAtualizado;
  }

  async deletar(id: string) {
    const produtoRemovido = await this.produtoRepository.delete(id);
    return produtoRemovido;
  }
}
