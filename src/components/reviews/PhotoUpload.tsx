import { useCallback, useState } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import { ImagePlus, X, AlertCircle } from 'lucide-react';
import { validateImageFile } from '@/lib/storage';

interface PhotoUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  error?: string;
}

export function PhotoUpload({
  files,
  onChange,
  maxFiles = 5,
  error,
}: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [fileErrors, setFileErrors] = useState<string[]>([]);

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;

      const errors: string[] = [];
      const validFiles: File[] = [];

      Array.from(newFiles).forEach((file) => {
        const validation = validateImageFile(file);
        if (validation.valid) {
          validFiles.push(file);
        } else if (validation.error) {
          errors.push(`${file.name}: ${validation.error}`);
        }
      });

      // Check max files limit
      const totalFiles = files.length + validFiles.length;
      if (totalFiles > maxFiles) {
        errors.push(`Máximo de ${maxFiles} imagens permitido`);
        validFiles.splice(maxFiles - files.length);
      }

      setFileErrors(errors);
      if (validFiles.length > 0) {
        onChange([...files, ...validFiles]);
      }

      // Clear errors after 5 seconds
      if (errors.length > 0) {
        setTimeout(() => setFileErrors([]), 5000);
      }
    },
    [files, maxFiles, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={clsx(
          'relative border-2 border-dashed rounded-editorial p-8',
          'transition-colors duration-200',
          dragActive
            ? 'border-terracotta-400 bg-terracotta-50'
            : error
            ? 'border-status-avoid bg-status-avoid/5'
            : 'border-sand-300 hover:border-sand-400 bg-cream-50'
        )}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={files.length >= maxFiles}
        />

        <div className="text-center">
          <ImagePlus
            className={clsx(
              'w-10 h-10 mx-auto mb-3',
              dragActive ? 'text-terracotta-500' : 'text-sand-400'
            )}
          />
          <p className="text-sm font-medium text-ink-600 mb-1">
            {files.length >= maxFiles
              ? `Limite de ${maxFiles} imagens atingido`
              : 'Arraste imagens ou clique para selecionar'}
          </p>
          <p className="text-xs text-ink-400">
            JPEG, PNG ou WebP até 5MB cada
          </p>
        </div>
      </div>

      {/* File errors */}
      <AnimatePresence>
        {fileErrors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-status-avoid/10 border border-status-avoid/20 rounded-editorial p-3"
          >
            {fileErrors.map((err, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-status-avoid">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {err}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form error */}
      {error && (
        <p className="text-sm text-status-avoid">{error}</p>
      )}

      {/* Preview grid */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <AnimatePresence mode="popLayout">
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                layout
                className="relative aspect-square rounded-editorial overflow-hidden border border-sand-200 group"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/40 transition-colors" />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className={clsx(
                    'absolute top-2 right-2 p-1.5 rounded-full',
                    'bg-cream-50/90 text-ink-600',
                    'opacity-0 group-hover:opacity-100 transition-opacity',
                    'hover:bg-status-avoid hover:text-cream-50'
                  )}
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Counter */}
      <p className="text-xs text-ink-400 text-right">
        {files.length} / {maxFiles} imagens
      </p>
    </div>
  );
}
