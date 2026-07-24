// src/utils/file.utils.ts
import { Express } from 'express';

/**
 * Type Guard que verifica si un objeto dado es de tipo Express.Multer.File.
 * @param file El objeto a verificar.
 * @returns true si el objeto es un Express.Multer.File válido, false de lo contrario.
 */
export function isMulterFile(file: unknown): file is Express.Multer.File {
  // Primero, asegura que es un objeto y no null.
  if (file === null || typeof file !== 'object') {
    return false;
  }

  // Ahora, podemos afirmar que 'file' es un objeto con propiedades,
  // pero no necesariamente todas las de Express.Multer.File.
  // Usamos una afirmación de tipo para decirle a TypeScript que,
  // en este punto, estamos tratándolo como un objeto con algunas propiedades potencialmente indefinidas.
  const potentialFile = file as Record<string, unknown>; // Afirma que es un objeto con claves de string y valores desconocidos.

  // Realizamos las comprobaciones de tipo en las propiedades esperadas.
  // Usamos `typeof potentialFile.propertyName === 'string'` para evitar accesos inseguros en `unknown`.
  return (
    typeof potentialFile.originalname === 'string' &&
    typeof potentialFile.mimetype === 'string' &&
    (potentialFile.buffer instanceof Buffer ||
      typeof potentialFile.path === 'string')
  );
}

/**
 * Type Guard que verifica si un array de objetos dado es un array de Express.Multer.File.
 * @param files El array de objetos a verificar.
 * @returns true si el array contiene solo Express.Multer.File válidos, false de lo contrario.
 */
export function areMulterFiles(
  files: unknown[],
): files is Array<Express.Multer.File> {
  if (!Array.isArray(files)) {
    return false;
  }
  return files.every((file) => isMulterFile(file));
}
