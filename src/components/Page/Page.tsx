import {nanoid} from 'nanoid';
import {useFocusedNodeIndex} from '../../utils/useFocusedNodeIndex';
import {DndContext, DragOverlay, DragEndEvent} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import Cover from './Cover';
import Spacer from './Spacer';
import Title from './Title';
import NodeContainer from '../Node/NodeContainer';
import usePageStore from '../../utils/usePageState';

export default function Page() {
  const {title, nodes, addNode, setTitle, reorderNodes} = usePageStore();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  const handleDragEvent = (event: DragEndEvent) => {
    const {active, over} = event;
    if (over?.id && active.id !== over?.id) {
      reorderNodes(active.id as string, over.id as string);
    }
  };

  return (
    <>
      <Cover />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />
        <DndContext onDragEnd={handleDragEvent}>
          <SortableContext items={nodes} strategy={verticalListSortingStrategy}>
            {nodes.map((node, index) => (
              <NodeContainer
                key={node.id}
                node={node}
                index={index}
                isFocused={focusedNodeIndex === index}
                updateFocusedIndex={setFocusedNodeIndex}
              />
            ))}
          </SortableContext>
          <DragOverlay />
        </DndContext>

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
