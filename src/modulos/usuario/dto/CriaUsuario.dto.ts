import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { EmailUnico } from '../validacao/email-unico.validator';

export class CriaUsuarioDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsEmail(undefined, { message: 'O email deve ser válido' })
  @EmailUnico({ message: 'O email já está em uso' })
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{6,30}$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
  })
  @MinLength(6, { message: 'A senha deve conter pelo menos 6 caracteres' })
  senha: string;
}
