import styles from './Node.module.css';
import {NodeData} from '../../utils/types';
import {useRef, useEffect, FormEventHandler, KeyboardEventHandler} from 'react';
import {nanoid} from 'nanoid';

type BasicNodeProps = {
  node: NodeData;
  isFocused: boolean;
  index: number;
  addNode(index: number, node: NodeData): void;
  removeNodeByIndex(index: number): void;
  changeNodeValue(index: number, value: string): void;
  updateFocusedIndex(index: number): void;
};

export default function BasicNode({
  node,
  isFocused,
  index,
  addNode,
  removeNodeByIndex,
  changeNodeValue,
  updateFocusedIndex,
}: BasicNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

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
