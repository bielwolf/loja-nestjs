import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsuarioRepository } from '../usuario.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(value: any): Promise<boolean> {
    try {
      const usuarioExiste = await this.usuarioRepository.existeEmail(value);
      return !usuarioExiste;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return true;
      }
      throw error;
    }
  }
}

export const EmailUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailUnicoValidator,
    });
  };
};
