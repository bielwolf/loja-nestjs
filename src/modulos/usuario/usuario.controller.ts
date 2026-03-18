import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDto } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDto } from './dto/AtualizaUsuario.dto';
import { UsuarioService } from './usuario.service';
import { HashearSenhaPipe } from 'src/recursos/pipes/hashear-senha.pipe';

@Controller('/usuarios')
export class UsuarioController {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private usuarioService: UsuarioService,
  ) {}

  @Post()
  async criaUsuario(
    @Body() { senha, ...dadosDoUsuario }: CriaUsuarioDto,
    @Body('senha', HashearSenhaPipe) senhaHasheada: string,
  ) {
    const usuarioCriado = await this.usuarioService.criaUsuario({
      ...dadosDoUsuario,
      senha: senhaHasheada,
    });

    return {
      messagem: 'usuário criado com sucesso',
      usuario: new ListaUsuarioDTO(usuarioCriado.id, usuarioCriado.nome),
    };
  }

  @Get()
  async listarUsuarios() {
    const usuariosSalvos = await this.usuarioService.listar();

    return {
      usuarios: usuariosSalvos,
      message: 'Usuários listados com sucesso',
    };
  }

  @Put('/:id')
  async atualizarUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDto,
  ) {
    const usuario = await this.usuarioService.atualizar(id, novosDados);

    return {
      usuario: usuario,
      message: 'Usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async deletarUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletar(id);
    return {
      usuario: usuarioRemovido,
      message: 'Usuário deletado com sucesso',
    };
  }
}
