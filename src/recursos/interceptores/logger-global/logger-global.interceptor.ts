import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequisicaoComUsuario } from 'src/modulos/autenticacao/autenticacao.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextoHttp = context.switchToHttp();

    const requisicao = contextoHttp.getRequest<
      Request | RequisicaoComUsuario
    >();

    return next.handle().pipe(
      tap(() => {
        if ('usuario' in requisicao) {
          this.logger.log(
            `Rota acessada pelo usuário ${requisicao.usuario.sub}`,
          );
        }
      }),
    );
  }
}
