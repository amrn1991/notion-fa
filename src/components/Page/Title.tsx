import styles from './Title.module.css';
import {NodeData} from '../../utils/types';
import {useRef, useEffect} from 'react';
import {nanoid} from 'nanoid';

type TitleProps = {
  title: string;
  changePageTitle(title: string): void;
  addNode(index: number, node: NodeData): void;
};

export default function Title ({title, changePageTitle, addNode}: TitleProps) {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const isFocused = document.activeElement == headerRef.current;
    if (!isFocused && headerRef.current) {
      headerRef.current.textContent = title;
    }
  }, [title]);

  return (
    <div className={styles.container}>
      <h1
        className={styles.title}
        ref={headerRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => changePageTitle(e.currentTarget.textContent || '')}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            addNode(0, {type: 'text', id: nanoid(), value: ''});
          }
        }}
      />
    </div>
  );
};
