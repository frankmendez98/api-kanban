// disk.enum.ts (Si no lo tienes)
enum DiskType {
  LOCAL = 'local',
  S3 = 's3',
}

// get-file-query.dto.ts
import { IsEnum } from 'class-validator';

export class FileShowDto {
  @IsEnum(DiskType, { message: 'El valor de "disk" debe ser "local" o "s3"' })
  disk: DiskType = DiskType.LOCAL; // Valor por defecto
}
