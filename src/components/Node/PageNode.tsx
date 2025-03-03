import {useEffect, useState} from 'react';
import {NodeData} from '../../utils/types';
import {useNavigate} from '@tanstack/react-router';
import {useAppState} from '../../context/AppStateContext';
import {supabase} from '../../utils/SupabaseClient';
import cx from 'classnames';
import styles from './Node.module.css';

type PageNodeProps = {
  node: NodeData;
  isFocused: boolean;
  index: number;
};

export default function PageNode({node, isFocused, index}: PageNodeProps) {
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState('');
  const {removeNodeByIndex} = useAppState();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === 'Backspace') {
        removeNodeByIndex(index);
      }
      if (event.key === 'Enter') {
        navigate({to: `/${node.value}`});
      }
    };
    if (isFocused) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFocused, removeNodeByIndex, index, navigate, node]);

  useEffect(() => {
    const fetchPageTitle = async () => {
      const {data} = await supabase.from('pages').select('title').eq('slug', node.value).single();
      setPageTitle(data?.title);
    };
    if (node.type === 'page' && node.value) {
      fetchPageTitle();
    }
  }, [node.type, node.value]);

  const navigateToPage = () => navigate({to: `/${node.value}`});

  return (
    <div
      onClick={navigateToPage}
      className={cx(styles.node, styles.page, {
        [styles.focused]: isFocused,
      })}>
      📄 {pageTitle}
    </div>
  );
}
