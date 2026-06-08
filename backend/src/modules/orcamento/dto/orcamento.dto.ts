import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateOrcamentoDto {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  telefone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  empresa?: string;

  @ApiProperty()
  @IsString()
  mensagem: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  produtos?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  arquivo_url?: string;
}
