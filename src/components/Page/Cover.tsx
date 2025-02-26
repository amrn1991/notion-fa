import {useRef, ChangeEventHandler} from 'react';
import styles from './Cover.module.css';

function Cover() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeCoverImage = () => {
    fileInputRef.current?.click();
  };

  const handleUploadCover: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target;
    console.log(target?.files?.[0])
  };

  return (
    <div className={styles.cover}>
      <img src="https://picsum.photos/1080/300" alt="Cover" className={styles.image} />
      <button className={styles.button} onClick={handleChangeCoverImage}>
        تغییر تصویر
      </button>
      <input ref={fileInputRef} onChange={handleUploadCover} className={styles.input} type="file" name="image" />
    </div>
  );
}

export default Cover;
