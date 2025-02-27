import styles from './Node.module.css';
import {NodeData} from '../../utils/types';
import {useRef, useEffect, FormEventHandler, KeyboardEventHandler} from 'react';
import {nanoid} from 'nanoid';
import usePageStore from '../../utils/usePageState';

type BasicNodeProps = {
  node: NodeData;
  index: number;
  isFocused: boolean;
  updateFocusedIndex(index: number): void;
};

export default function BasicNode({node, isFocused, index, updateFocusedIndex}: BasicNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const {addNode, changeNodeValue, removeNodeByIndex} = usePageStore();

  useEffect(() => {
    if (nodeRef.current && document.activeElement !== nodeRef.current) {
      nodeRef.current.textContent = node.value;
    }
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [node, isFocused]);

  const handleInput: FormEventHandler<HTMLDivElement> = ({currentTarget}) => {
    const {textContent} = currentTarget;
    changeNodeValue(index, textContent || '');
  };

  const handleClick = () => {
    updateFocusedIndex(index);
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;
    if (event.key === 'Enter') {
      event.preventDefault();
      if (target.textContent?.[0] === '/') {
        return;
      }
      addNode(index + 1, {type: node.type, value: '', id: nanoid()});
      updateFocusedIndex(index + 1);
    }
    if (event.key === 'Backspace') {
      if (target.textContent?.length === 0) {
        event.preventDefault();
        removeNodeByIndex(index);
        updateFocusedIndex(index - 1);
      } else if (window?.getSelection()?.anchorOffset === 0) {
        event.preventDefault();
        removeNodeByIndex(index - 1);
        updateFocusedIndex(index - 1);
      }
    }
  };

  return (
    <>
      <div
        ref={nodeRef}
        className={styles.node}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onClick={handleClick}
        onKeyDown={onKeyDown}
      />
    </>
  );
}
