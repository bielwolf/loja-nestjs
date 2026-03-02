import { IsNotEmpty, IsUrl, MaxLength } from 'class-validator';

export class ImagemProdutoDTO {
  @IsUrl({}, { message: 'A URL da imagem deve ser válida' })
  url: string;

  @IsNotEmpty({ message: 'A descrição da imagem é obrigatória' })
  @MaxLength(1000, {
    message: 'A descrição da imagem deve ter no máximo 1000 caracteres',
  })
  descricao: string;
}
