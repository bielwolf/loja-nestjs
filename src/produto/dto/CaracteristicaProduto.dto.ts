import { IsNotEmpty, MaxLength } from 'class-validator';

export class CaracteristicaProdutoDTO {
  @IsNotEmpty({ message: 'O nome da característica é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'A descrição da característica é obrigatória' })
  @MaxLength(1000, {
    message: 'A descrição da característica deve ter no máximo 1000 caracteres',
  })
  descricao: string;
}
