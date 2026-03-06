import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CaracteristicaProdutoDTO } from './CaracteristicaProduto.dto';
import { ImagemProdutoDTO } from './ImagemProduto.dto';

export class CriaProdutoDTO {

  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioId: string;
  
  @IsNotEmpty({ message: 'O nome do produto é obrigatório' })
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'O valor do produto deve ser maior que zero' })
  valor: number;

  @IsNumber()
  @Min(0, { message: 'A quantidade do produto deve ser zero ou maior' })
  quantidade: number;

  @MaxLength(1000, {
    message: 'A descrição do produto deve ter no máximo 1000 caracteres',
  })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsNotEmpty({ message: 'A categoria do produto é obrigatória' })
  categoria: string;
}
