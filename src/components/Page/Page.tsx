import {nanoid} from 'nanoid';
import {useFocusedNodeIndex} from '../../utils/useFocusedNodeIndex';
import Cover from './Cover';
import Spacer from './Spacer';
import Title from './Title';
import NodeTypeSwitcher from '../Node/NodeTypeSwitcher';
import usePageStore from '../../utils/usePageState';

export default function Page() {
  const {title, nodes, addNode, setTitle} = usePageStore();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  return (
    <>
      <Cover />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />

        {nodes.map((node, index) => (
          <NodeTypeSwitcher
            key={node.id}
            node={node}
            index={index}
            isFocused={focusedNodeIndex === index}
            updateFocusedIndex={setFocusedNodeIndex}
          />
        ))}

        <Spacer
          handleClick={() => {
            console.log(nodes);
            addNode(nodes.length, {type: 'text', value: '', id: nanoid()});
          }}
          showHint={!nodes.length}
        />
      </div>
    </>
  );
}
