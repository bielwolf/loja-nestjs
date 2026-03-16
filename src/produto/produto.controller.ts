import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoRepository } from './produto.repository';
import { ProdutoService } from './produto.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@Controller('produtos')
export class ProdutoController {
  constructor(
    private readonly produtoRepository: ProdutoRepository,
    private readonly produtoService: ProdutoService,
  ) {}

  @Post()
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    const produtoCadastrado = await this.produtoService.criar(dadosProduto);

    return {
      mensagem: 'produto cadastrado com sucesso',
      produto: produtoCadastrado,
    };
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('lista_produtos')
  listaTodos() {
    return this.produtoRepository.listaTodos();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async listaUm(@Param('id') id: string) {
    const produtoSalvo = await this.produtoService.listaUmProduto(id);

    console.log('Produto sendo buscado do BD!');

    return produtoSalvo;
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoAlterado = await this.produtoService.atualizar(
      id,
      dadosProduto,
    );

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.produtoService.deletar(id);

    return {
      mensagem: 'produto removido com sucesso',
      produto: produtoRemovido,
    };
  }
}
