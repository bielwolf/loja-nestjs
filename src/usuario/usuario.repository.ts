import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioRepository {
  private usuarios = [];

  salvar(usuario) {
    this.usuarios.push(usuario);
  }

  listar() {
    return this.usuarios;
  }

  existeEmail(email: string) {
    const usuario = this.usuarios.find(u => u.email === email);
    return usuario !== undefined;
  }
}
