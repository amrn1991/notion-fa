import {ImgHTMLAttributes, useEffect, useState} from 'react';
import {supabase} from '../utils/SupabaseClient';
import Loader from './Loader';
import styles from '../utils/common.module.css';

type FileImageProps = {
  filePath: string;
} & ImgHTMLAttributes<HTMLImageElement>;

export default function FileImage({filePath, ...props}: FileImageProps) {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const downloadImage = async (filePath: string) => {
      setLoading(true);
      const {data} = await supabase.storage.from('images').download(filePath);
      if (data) {
        const url = URL.createObjectURL(data);
        setImage(url);
        setLoading(false);
      }
    };
    if (filePath && filePath.length > 0) {
      downloadImage(filePath);
    }
  }, [filePath]);

  if (loading) {
    return (
      <div className={styles.centeredFlex}>
        <Loader />
      </div>
    );
  }

  return <img src={image} alt={filePath} {...props} />;
};
