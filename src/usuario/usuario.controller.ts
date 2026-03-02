import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDto } from './dto/CriaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDto) {
    this.usuarioRepository.salvar(dadosDoUsuario);
    return 'Usuário criado com sucesso!';
  }

  @Get()
  listarUsuarios() {
    return this.usuarioRepository.listar();
  }
}
