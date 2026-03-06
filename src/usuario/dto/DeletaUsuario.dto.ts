import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailUnico } from '../validacao/email-unico.validator';

export class DeletaUsuarioDto {

  @IsOptional()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome?: string;

  @IsOptional()
  @IsEmail(undefined, { message: 'O email deve ser válido' })
  @EmailUnico({ message: 'O email já está em uso' })
  email?: string;
  
  @IsOptional()
  @MinLength(6, { message: 'A senha deve conter pelo menos 6 caracteres' })
  senha?: string;
}
