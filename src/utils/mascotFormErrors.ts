export type MascotErrorCode =
  | 'unauthorized'
  | 'no_files'
  | 'invalid_file_type'
  | 'file_too_large'
  | 'birth_date_required'
  | 'pet_not_found'
  | 'invalid_pet_id'
  | 'validation'
  | 'network'
  | 'server'
  | 'required_field'
  | 'invalid_image_url'
  | 'unknown';

export interface MascotFormError {
  code: MascotErrorCode;
  title: string;
  message: string;
  details: string[];
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const FIELD_LABELS: Record<string, string> = {
  species: 'Especie',
  name: 'Nombre',
  breed: 'Raza',
  approximateBirthDate: 'Fecha aproximada de nacimiento',
  gender: 'Género',
  size: 'Tamaño',
  status: 'Estado',
  description: 'Descripción',
  personality: 'Personalidad',
  specialCare: 'Cuidados especiales',
  healthConditions: 'Condiciones de salud',
  images: 'Imágenes',
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} bytes`;
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

function parseMongooseValidationError(message: string): MascotFormError | null {
  if (!message.includes('validation failed')) return null;

  const details: string[] = [];
  const fieldMatches = message.matchAll(/(\w+):\s*([^,]+?)(?:,|$)/g);

  for (const match of fieldMatches) {
    const field = match[1];
    const rawError = match[2].trim();
    const label = FIELD_LABELS[field] || field;

    if (rawError.includes('is required')) {
      details.push(`${label}: este campo es obligatorio.`);
    } else if (rawError.includes('is not a valid enum value')) {
      details.push(`${label}: el valor seleccionado no es válido.`);
    } else {
      details.push(`${label}: ${rawError}`);
    }
  }

  if (details.length === 0) {
    details.push('Revisa que todos los campos obligatorios estén completos y con valores válidos.');
  }

  return {
    code: 'validation',
    title: 'Faltan datos o hay valores inválidos',
    message: 'No pudimos guardar la mascota porque algunos campos no pasaron la validación.',
    details,
  };
}

function parseCastError(message: string): MascotFormError | null {
  if (!message.includes('Cast to Date failed')) return null;

  return {
    code: 'validation',
    title: 'Fecha inválida',
    message: 'La fecha aproximada de nacimiento no tiene un formato válido.',
    details: ['Selecciona una fecha válida en el campo "Fecha aproximada de nacimiento".'],
  };
}

export function parseApiError(
  status: number,
  rawError?: string,
  context: 'upload' | 'save' | 'load' = 'save',
): MascotFormError {
  const error = rawError?.trim() || '';

  if (status === 401 || error === 'Unauthorized') {
    return {
      code: 'unauthorized',
      title: 'Sesión expirada',
      message: 'Tu sesión de administrador ya no es válida.',
      details: [
        'Cierra sesión e inicia de nuevo con la contraseña de administrador.',
        'Si el problema continúa, verifica que la contraseña esté configurada en el servidor.',
      ],
    };
  }

  if (error === 'No files uploaded') {
    return {
      code: 'no_files',
      title: 'No se recibieron imágenes',
      message: 'El servidor no recibió archivos de imagen para subir.',
      details: [
        'Selecciona al menos una imagen desde tu computadora.',
        'Si ya seleccionaste archivos, intenta elegirlos de nuevo.',
      ],
    };
  }

  if (error.startsWith('Invalid file type:')) {
    const typeMatch = error.match(/Invalid file type:\s*([^.]+)/);
    const fileType = typeMatch?.[1]?.trim() || 'desconocido';

    return {
      code: 'invalid_file_type',
      title: 'Formato de imagen no permitido',
      message: 'Una o más imágenes tienen un formato que no aceptamos.',
      details: [
        `Tipo detectado: ${fileType}.`,
        'Usa archivos JPG, PNG o WebP.',
        'Si el archivo parece correcto, intenta guardarlo de nuevo en ese formato.',
      ],
    };
  }

  if (error.startsWith('File too large:')) {
    const sizeMatch = error.match(/File too large:\s*(\d+)/);
    const fileSize = sizeMatch ? formatFileSize(Number(sizeMatch[1])) : 'más de 5 MB';

    return {
      code: 'file_too_large',
      title: 'Imagen demasiado pesada',
      message: 'Una o más imágenes superan el tamaño máximo permitido.',
      details: [
        `Tamaño detectado: ${fileSize}. El máximo es 5 MB por imagen.`,
        'Comprime la imagen o elige otra con menor resolución.',
      ],
    };
  }

  if (error === 'La fecha aproximada de nacimiento es requerida') {
    return {
      code: 'birth_date_required',
      title: 'Falta la fecha de nacimiento',
      message: 'Necesitamos la fecha aproximada de nacimiento para crear el perfil.',
      details: ['Completa el campo "Fecha aproximada de nacimiento" antes de guardar.'],
    };
  }

  if (error === 'Pet not found') {
    return {
      code: 'pet_not_found',
      title: 'Mascota no encontrada',
      message: 'No encontramos esta mascota en el catálogo.',
      details: [
        'Es posible que ya haya sido eliminada.',
        'Vuelve a la lista y actualiza los datos antes de intentar de nuevo.',
      ],
    };
  }

  if (error === 'Invalid pet id') {
    return {
      code: 'invalid_pet_id',
      title: 'Identificador inválido',
      message: 'El identificador de la mascota no es válido.',
      details: ['Vuelve a la lista y selecciona la mascota otra vez.'],
    };
  }

  const mongooseError = parseMongooseValidationError(error) || parseCastError(error);
  if (mongooseError) return mongooseError;

  if (status >= 500) {
    return {
      code: 'server',
      title: context === 'upload' ? 'Error al subir imágenes' : 'Error del servidor',
      message:
        context === 'upload'
          ? 'Ocurrió un problema en el servidor al procesar las imágenes.'
          : 'Ocurrió un problema en el servidor al guardar la mascota.',
      details: [
        error || 'Intenta de nuevo en unos minutos.',
        'Si el error persiste, revisa la conexión a la base de datos.',
      ],
    };
  }

  if (context === 'upload') {
    return {
      code: 'unknown',
      title: 'No se pudieron subir las imágenes',
      message: error || 'Ocurrió un error inesperado al subir las imágenes.',
      details: ['Verifica el formato y el tamaño de cada imagen e intenta de nuevo.'],
    };
  }

  return {
    code: 'unknown',
    title: 'No se pudo guardar la mascota',
    message: error || 'Ocurrió un error inesperado al guardar el perfil.',
    details: ['Revisa los datos del formulario e intenta de nuevo.'],
  };
}

export function createNetworkError(context: 'upload' | 'save' | 'load' = 'save'): MascotFormError {
  const titles: Record<typeof context, string> = {
    upload: 'No se pudieron subir las imágenes',
    save: 'No se pudo guardar la mascota',
    load: 'No se pudo cargar la mascota',
  };

  return {
    code: 'network',
    title: titles[context],
    message: 'No pudimos comunicarnos con el servidor.',
    details: [
      'Verifica tu conexión a internet.',
      'Si estás conectado, espera un momento e intenta de nuevo.',
    ],
  };
}

export function validateImageFiles(files: FileList | File[] | null): MascotFormError | null {
  if (!files || files.length === 0) return null;

  const invalidTypes: string[] = [];
  const oversized: string[] = [];

  for (const file of Array.from(files)) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      invalidTypes.push(`${file.name} (${file.type || 'tipo desconocido'})`);
    }

    if (file.size > MAX_FILE_SIZE) {
      oversized.push(`${file.name} (${formatFileSize(file.size)})`);
    }
  }

  if (invalidTypes.length > 0) {
    return {
      code: 'invalid_file_type',
      title: 'Formato de imagen no permitido',
      message: 'Una o más imágenes seleccionadas tienen un formato no válido.',
      details: [
        ...invalidTypes.map((item) => `Archivo no válido: ${item}.`),
        'Usa archivos JPG, PNG o WebP.',
      ],
    };
  }

  if (oversized.length > 0) {
    return {
      code: 'file_too_large',
      title: 'Imagen demasiado pesada',
      message: 'Una o más imágenes superan el límite de 5 MB.',
      details: [
        ...oversized.map((item) => `Archivo demasiado grande: ${item}.`),
        'Comprime las imágenes o elige archivos más livianos.',
      ],
    };
  }

  return null;
}

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateImageUrls(urls: string[]): MascotFormError | null {
  const invalidUrls = urls.filter((url) => !isValidHttpUrl(url));

  if (invalidUrls.length === 0) return null;

  return {
    code: 'invalid_image_url',
    title: 'URL de imagen inválida',
    message: 'Una o más URLs de imagen no tienen un formato válido.',
    details: [
      ...invalidUrls.map((url) => `URL inválida: ${url}`),
      'Usa URLs completas que empiecen con http:// o https://.',
      'También puedes subir imágenes directamente desde tu computadora.',
    ],
  };
}

export function validateRequiredFields(form: HTMLFormElement): MascotFormError | null {
  const missingFields: string[] = [];

  for (const element of Array.from(form.elements)) {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement)) {
      continue;
    }

    if (!element.required || element.disabled) continue;

    const value = element.type === 'checkbox' ? (element.checked ? 'checked' : '') : element.value.trim();
    if (!value) {
      const label = FIELD_LABELS[element.name] || element.labels?.[0]?.textContent?.replace('*', '').trim() || element.name;
      missingFields.push(label);
    }
  }

  if (missingFields.length === 0) return null;

  return {
    code: 'required_field',
    title: 'Faltan campos obligatorios',
    message: 'Completa todos los campos marcados con asterisco (*) antes de guardar.',
    details: missingFields.map((field) => `${field}: este campo es obligatorio.`),
  };
}
