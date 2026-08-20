import { useState, type ChangeEvent } from 'react';
import css from '../../../pages/AddRecipePage/AddRecipePage.module.css';
import cameraIcon from '../../../assets/camera.svg';

type Props = {
  file: File | null;
  error?: string;
  onChange: (file: File | null) => void;
};

export default function ImageUploader({ file: _file, error, onChange }: Props) {
  const [preview, setPreview] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
    } else {
      setPreview('');
    }

    onChange(selectedFile);
  };

  const handleRemove = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview('');
    onChange(null);
  };

  return (
    <div>
      <label className={`${css.photoBox} ${error ? css.invalid : ''}`}>
        {preview ? (
          <img src={preview} alt="Recipe preview" />
        ) : (
          <>
            <img className={css.cameraIcon} src={cameraIcon} alt="" />
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
        <button type="button" onClick={handleRemove}>
          Remove image
        </button>
      )}

      {error && <p className={css.error}>{error}</p>}
    </div>
  );
}
