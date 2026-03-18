import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UsuarioPayload } from './autenticacao.service';
import { JwtService } from '@nestjs/jwt';

export interface RequisicaoComUsuario extends Request {
  usuario: UsuarioPayload;
}

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(contexto: ExecutionContext): Promise<boolean> {
    const requisicao = await contexto
      .switchToHttp()
      .getRequest<RequisicaoComUsuario>();
    const token = this.extrairToken(requisicao);

    if (!token) {
      throw new UnauthorizedException('Token de autenticacao nao encontrado');
    }

    try {
      const payload: UsuarioPayload = await this.jwtService.verifyAsync(token);
      requisicao.usuario = payload;
    } catch {
      throw new UnauthorizedException('Token de autenticacao invalido');
    }
    return true;
  }

  private extrairToken(requisicao: Request): string | undefined {
    const [tipo, token] = requisicao.headers.authorization.split(' ') ?? [];
    return tipo === 'Bearer' ? token : undefined;
  }
}
