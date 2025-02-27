import {useState, useEffect} from 'react';
import {NodeType} from '../../utils/types';
import {useOverflowsScreenBottom} from '../../utils/useOverflowsScreenBottom';
import styles from './CommandPanel.module.css';
import cx from 'classnames';

type CommandPanelProps = {
  nodeText: string;
  selectItem: (nodeType: NodeType) => void;
};

type SupportedNodeType = {
  value: NodeType;
  name: string;
};

const supportedNodeTypes: SupportedNodeType[] = [
  {value: 'text', name: 'نوشته'},
  {value: 'list', name: 'لیست'},
  {value: 'heading1', name: 'تیتر یک'},
  {value: 'heading2', name: 'تیتر دو'},
  {value: 'heading3', name: 'تیتر سه'},
];

export default function CommandPanel({selectItem, nodeText}: CommandPanelProps) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const {overflows, ref} = useOverflowsScreenBottom();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        selectItem(supportedNodeTypes[selectedItemIndex].value);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItemIndex, selectItem]);

  useEffect(() => {
    const normalizedValue = nodeText.toLowerCase().replace(/\//, '');
    setSelectedItemIndex(supportedNodeTypes.findIndex((item) => item.value.match(normalizedValue)));
  }, [nodeText]);

  return (
    <div
      ref={ref}
      className={cx(styles.panel, {
        [styles.reverse]: overflows,
      })}>
      <div className={styles.title}>عناصر</div>
      <ul>
        {supportedNodeTypes.map((type, index) => {
          const selected = selectedItemIndex === index;

          return (
            <li
              key={type.value}
              className={cx({
                [styles.selected]: selected,
              })}
              onClick={() => selectItem(type.value)}>
              {type.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
