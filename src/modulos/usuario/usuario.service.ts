import { Injectable, NotFoundException } from '@nestjs/common';
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

    Object.assign(usuarioEntity, dadosDoUsuario as UsuarioEntity);

    return this.usuarioRepository.save(usuarioEntity);
  }

  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (checkEmail === null)
      throw new NotFoundException('O email não foi encontrado.');

    return checkEmail;
  }

  async listar(): Promise<ListaUsuarioDTO[]> {
    const usuarios = await this.usuarioRepository.find();
    const listaUsuarios = usuarios.map(
      (u) => new ListaUsuarioDTO(u.id, u.nome),
    );
    return listaUsuarios;
  }

  async atualizar(id: string, novosDados: AtualizaUsuarioDto) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    Object.assign(usuario, novosDados);

    return this.usuarioRepository.save(usuario);
  }

  async deletar(id: string) {
    const usuarioRemovido = await this.usuarioRepository.delete(id);

    if (!usuarioRemovido.affected) {
      throw new NotFoundException('Usuário nao encontrado');
    }

    return usuarioRemovido;
  }
}
