import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';

@Controller('/produtoss')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Post()
  criaProdutos(@Body() dadosDoProdutos) {
    this.produtoRepository.salvar(dadosDoProdutos);
    return 'Produto criado com sucesso!';
  }

  @Get()
  listarProdutos() {
    return this.produtoRepository.listar();
  }
}
