import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDto } from './dto/AtualizaPedido.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Query('usuarioId') usuarioId: string,
    @Body() dadosDoPedido: CriaPedidoDTO,
  ) {
    const pedidoCriado = await this.pedidoService.cadastrarPedido(
      usuarioId,
      dadosDoPedido,
    );
    return pedidoCriado;
  }

  @Get()
  async obtemPedidosDeUsuario(@Query('usuarioId') usuarioId: string) {
    const pedidos = await this.pedidoService.obtemPedidosDeUsuario(usuarioId);

    return pedidos;
  }

  @Patch(':id')
  atualizaPedido(
    @Param('id') id: string,
    @Body() dadosAtualizados: AtualizaPedidoDto,
  ) {
    return this.pedidoService.atualizaPedido(id, dadosAtualizados);
  }
}
