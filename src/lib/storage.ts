import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from './firebase';
import imageCompression from 'browser-image-compression';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const COMPRESSION_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export interface UploadProgress {
  progress: number;
  url?: string;
  error?: Error;
}

export async function compressImage(file: File): Promise<File> {
  if (file.size <= MAX_FILE_SIZE / 5) {
    return file; // Small enough, no need to compress
  }

  try {
    const compressedFile = await imageCompression(file, COMPRESSION_OPTIONS);
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    return file; // Return original if compression fails
  }
}

export function uploadReviewImage(
  reviewId: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // Compress image first
      const compressedFile = await compressImage(file);

      // Generate unique filename
      const extension = file.name.split('.').pop() || 'jpg';
      const filename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${extension}`;
      const storageRef = ref(storage, `reviews/${reviewId}/${filename}`);

      const uploadTask = uploadBytesResumable(storageRef, compressedFile, {
        contentType: file.type,
      });

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress?.(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

export async function uploadMultipleImages(
  reviewId: string,
  files: File[],
  onProgress?: (fileIndex: number, progress: number) => void
): Promise<string[]> {
  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const url = await uploadReviewImage(reviewId, files[i], (progress) => {
      onProgress?.(i, progress);
    });
    urls.push(url);
  }

  return urls;
}

export async function deleteReviewImage(imageUrl: string): Promise<void> {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw - image might already be deleted
  }
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Ficheiro deve ser uma imagem' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'Imagem deve ter menos de 5MB' };
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Formato não suportado. Use JPEG, PNG ou WebP' };
  }

  return { valid: true };
}
