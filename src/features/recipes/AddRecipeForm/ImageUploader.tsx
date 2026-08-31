import { useEffect, useState, type ChangeEvent } from 'react';
import { cn } from '@shared/lib';
import { FormError } from '@shared/ui';
import sprite from '@/assets/icons.svg';
import css from './ImageUploader.module.css';

type Props = {
  file: File | null;
  error?: string;
  onChange: (file: File | null) => void;
};

export default function ImageUploader({ file, error, onChange }: Props) {
  const [previewUrl, setPreviewUrl] = useState('');
  const preview = file ? previewUrl : '';

  useEffect(
    () => () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    },
    [previewUrl],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl('');
    }

    onChange(selectedFile);
  };

  const handleRemove = () => {
    setPreviewUrl('');
    onChange(null);
  };

  return (
    <div>
      <label className={cn(css.photoBox, error && css.invalid)}>
        {preview ? (
          <img src={preview} alt="Recipe preview" />
        ) : (
          <>
            <svg className={css.cameraIcon} aria-hidden="true">
              <use href={`${sprite}#icon-camera`} />
            </svg>
            <span className={css.uploadText}>Upload a photo</span>
          </>
        )}

        <input
          hidden
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
        />
      </label>

      {preview && (
        <button className={css.uploadPhoto} type="button" onClick={handleRemove}>
          Upload another photo
        </button>
      )}

      <FormError variant="compact">{error}</FormError>
    </div>
  );
}
