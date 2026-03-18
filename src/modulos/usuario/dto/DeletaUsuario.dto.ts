import { PartialType } from '@nestjs/mapped-types';
import { CriaUsuarioDto } from './CriaUsuario.dto';

export class DeletaUsuarioDto extends PartialType(CriaUsuarioDto) {}
