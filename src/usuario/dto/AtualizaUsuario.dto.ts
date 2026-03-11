import { CriaUsuarioDto } from './CriaUsuario.dto';
import { PartialType } from '@nestjs/mapped-types';

export class AtualizaUsuarioDto extends PartialType(CriaUsuarioDto) {}
