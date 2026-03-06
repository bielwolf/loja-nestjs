import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put 
} from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDto } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid} from 'uuid'
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDto } from './dto/AtualizaUsuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private usuarioService: UsuarioService
  ) {}

  @Post()
  criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDto) {
    const usuarioEntity = new UsuarioEntity()
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha
    usuarioEntity.nome = dadosDoUsuario.nome
    usuarioEntity.id = uuid()
    
    this.usuarioService.criar(usuarioEntity);

    return {
      usuario: new ListaUsuarioDTO(
        usuarioEntity.id,
        usuarioEntity.nome
      ),
      message: 'Usuário criado com sucesso'
    }
  }

  @Get()
  async listarUsuarios() {
    const usuariosSalvos =  await this.usuarioService.listar();

    return {
      usuarios: usuariosSalvos,
      message: 'Usuários listados com sucesso'
    }
  }

  @Put('/:id')
  async atualizarUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDto) {
    const usuario = await this.usuarioService.atualizar(id, novosDados);

    return {
      usuario: usuario,
      message: 'Usuário atualizado com sucesso'
    }
  }

  @Delete('/:id')
  async deletarUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletar(id);
    return {
      usuario: usuarioRemovido,
      message: 'Usuário deletado com sucesso'
    }
  }
}
