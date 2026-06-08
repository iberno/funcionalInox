import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber, Min, IsEnum } from 'class-validator';

export enum CategoriaSlug {
  HOSPITALAR = 'HOSPITALAR',
  VETERINARIA = 'VETERINARIA',
  COZINHA = 'COZINHA',
}

export class QueryProdutosDto {
  @ApiPropertyOptional({ enum: CategoriaSlug })
  @IsOptional()
  @IsEnum(CategoriaSlug)
  categoria?: CategoriaSlug;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subcategoria?: string;
}

export class CreateProdutoDto {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  descricao: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  destaque?: string;

  @ApiProperty({ enum: CategoriaSlug })
  @IsEnum(CategoriaSlug)
  categoriaId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subcategoria?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  padronizado?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  preco_min?: number;
}

export class UpdateProdutoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  destaque?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoriaId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subcategoria?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  padronizado?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  preco_min?: number;
}
