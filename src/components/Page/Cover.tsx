import {useRef, ChangeEventHandler} from 'react';
import styles from './Cover.module.css';
import FileImage from '../FileImage';
import { uploadImage } from '../../utils/uploadImage';

type CoverProps = {
  filePath?: string;
  changePageCover: (filePath: string) => void;
};

function Cover({filePath, changePageCover}: CoverProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeCoverImage = () => {
    fileInputRef.current?.click();
  };

  const handleUploadCover: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const target = event.target;

    const result = await uploadImage(target?.files?.[0]);

    if (result?.filePath) {
      changePageCover(result.filePath);
    }
  };

  return (
    <div className={styles.cover}>
      {filePath ? (
        <FileImage className={styles.image} filePath={filePath} />
      ) : (
        <img src="https://picsum.photos/1080/300" alt="Cover" className={styles.image} />
      )}
      <button className={styles.button} onClick={handleChangeCoverImage}>
        تغییر تصویر
      </button>
      <input ref={fileInputRef} onChange={handleUploadCover} className={styles.input} type="file" name="image" />
    </div>
  );
}

export default Cover;
