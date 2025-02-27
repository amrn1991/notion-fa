import {useState} from 'react';
import {nanoid} from 'nanoid';
import {NodeData} from '../../utils/types';
import {useFocusedNodeIndex} from '../../utils/useFocusedNodeIndex';
import Cover from './Cover';
import Spacer from './Spacer';
import Title from './Title';
import BasicNode from '../Node/BasicNode';

export default function Page() {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [title, setTitle] = useState('عنوان');
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  const addNode = (index: number, node: NodeData) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 0, node)
    setNodes(newNodes);
  };

  const removeNodeByIndex = (index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 1)
    setNodes(newNodes);
  };

  const changeNodeValue = (index: number, value: string) => {
    const newNodes = [...nodes];
    newNodes[index].value = value;
    setNodes(newNodes);
  };

  return (
    <>
      <Cover />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />

        {nodes.map((node, index) => (
          <BasicNode
            key={node.id}
            node={node}
            index={index}
            isFocused={focusedNodeIndex === index}
            updateFocusedIndex={setFocusedNodeIndex}
            addNode={addNode}
            changeNodeValue={changeNodeValue}
            removeNodeByIndex={removeNodeByIndex}
          />
        ))}

        <Spacer
          handleClick={() => {
            console.log(nodes)
            addNode(nodes.length, {type: 'text', value: '', id: nanoid()});
          }}
          showHint={!nodes.length}
        />
      </div>
    </>
  );
}
