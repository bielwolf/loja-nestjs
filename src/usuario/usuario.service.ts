import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDto } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDto } from './dto/CriaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(dadosDoUsuario: CriaUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();

    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;

    return this.usuarioRepository.save(usuarioEntity);
  }

  async listar(): Promise<ListaUsuarioDTO[]> {
    const usuarios = await this.usuarioRepository.find();
    const listaUsuarios = usuarios.map(
      (u) => new ListaUsuarioDTO(u.id, u.nome),
    );
    return listaUsuarios;
  }

  async atualizar(id: string, novosDados: AtualizaUsuarioDto) {
    const usuarioAtualizado = await this.usuarioRepository.update(
      id,
      novosDados,
    );
    return usuarioAtualizado;
  }

  async deletar(id: string) {
    const usuarioRemovido = await this.usuarioRepository.delete(id);
    return usuarioRemovido;
  }
}
