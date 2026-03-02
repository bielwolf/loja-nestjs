import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CriaUsuarioDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsEmail(undefined, { message: 'O email deve ser válido' })
  email: string;

  @MinLength(6, { message: 'A senha deve conter pelo menos 6 caracteres' })
  senha: string;
}
