import React, { ReactNode, useCallback } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { BarsOutlined } from '@ant-design/icons'

import { useAltIntl } from '../../../../../intlConfig'

type Props<T = object> = {
  list: T[]
  getIdFromItem: (item: T) => string
  renderItem: (item: T) => ReactNode
  onSortedList: (list: T[]) => void
}

export function SortableList<T extends unknown>({
  list,
  getIdFromItem,
  renderItem,
  onSortedList,
}: Props<T>) {
  const { formatMessage } = useAltIntl()
  const handleDrag = useCallback(
    (result: DropResult) => {
      const { destination, source } = result

      const noDestination = !destination

      const nothingChanged =
        destination?.droppableId === source.droppableId &&
        destination.index === source.index

      if (noDestination || nothingChanged) {
        return
      }

      const newEntities = [...list]

      const [removed] = newEntities.splice(source.index, 1)

      newEntities.splice(destination!.index, 0, removed)

      onSortedList(newEntities)
    },
    [list, onSortedList]
  )

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId="categories">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              border: '1px solid #f0f0f0',
              transition: 'all 0.2s ease-in-out',
            }}
            className={`${
              snapshot?.isDraggingOver ? 'bg-lightest-blue' : 'bg-light-gray'
            } pa3`}
          >
            {list.map((element, index) => (
              <Draggable
                key={getIdFromItem(element)}
                draggableId={getIdFromItem(element)}
                index={index}
              >
                {(innerProvided) => (
                  <div
                    {...innerProvided.draggableProps}
                    {...innerProvided.dragHandleProps}
                  >
                    <div
                      ref={innerProvided.innerRef}
                      style={{
                        border: '1px solid #f0f0f0',
                        minHeight: '65px',
                      }}
                      className="flex items-center justify-between ph3 pv2 mb3 bg-white"
                    >
                      <div className="flex items-center justify-between w-100">
                        <div className="mr3">
                          <BarsOutlined style={{ fontSize: '25px' }} />
                        </div>
                        {renderItem(element)}
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {!list.length && (
              <div className="flex justify-center tc">
                <span>{formatMessage({ id: 'tenant.sites.noItems' })}</span>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default SortableList
