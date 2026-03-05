import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  listar() {
    return this.usuarios;
  }

  existeEmail(email: string) {
    const usuario = this.usuarios.find(u => u.email === email);
    return usuario !== undefined;
  }

  atualizar(id: string, novosDados: Partial<UsuarioEntity>) {
    const usuario = this.usuarios.find(u => u.id === id);

    if (!usuario) {
      throw new Error('Usuário nao encontrado') ;
    }

    Object.assign(usuario, novosDados);
    return usuario
  }

  deletar(id: string) {
    const usuario = this.usuarios.find(u => u.id === id); 

    if (!usuario) {
      throw new Error('Usuário nao encontrado') ;
    }

    const novaLista = this.usuarios = this.usuarios.filter(u => u.id !== id);
    return novaLista
  }
}
