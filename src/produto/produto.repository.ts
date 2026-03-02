import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutoRepository {
  private produtos = [];

  salvar(produto) {
    this.produtos.push(produto);
  }

  listar() {
    return this.produtos;
  }
}
