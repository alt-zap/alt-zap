import React, { FC, Fragment, useCallback, useState } from 'react'
import { Divider, Typography, List, Card } from 'antd'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { BarsOutlined } from '@ant-design/icons'

import { useTenant } from '../../../../contexts/TenantContext'
import Categories from '../../categories/Categories'

const { Title } = Typography
// Situação Inicial: não foi salvo nenhum ordenamento.
// Situação Normal: já foi salvo um ordenamento
const SortCategories: FC = () => {
  const [{ tenant, products }] = useTenant()

  const [categoryIds, setIds] = useState<number[]>(
    tenant?.categories?.map((_, i) => i) ?? []
  )

  const categories = tenant?.categories ?? []

  const handleDrag = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result

      const noDestination = !destination

      const nothingChanged =
        destination?.droppableId === source.droppableId &&
        destination.index === source.index

      if (noDestination || nothingChanged) {
        return
      }

      const newCategoryIds = [...categoryIds]

      newCategoryIds.splice(source.index, 1)
      newCategoryIds.splice(destination!.index, 0, parseInt(draggableId, 10))

      setIds(newCategoryIds)
    },
    [setIds, categoryIds]
  )

  return (
    <div className="bg-white w-100">
      <span className="flex justify-center mt2 fw2 f4">Lista de Categoras</span>
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="categories">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{
                border: '1px solid #f0f0f0',
                height: `${65 * 2 + 50}px`,
                transition: 'all 0.2s ease-in-out',
              }}
              className={`${
                snapshot?.isDraggingOver ? 'bg-lightest-blue' : ''
              } pa3`}
            >
              {categoryIds.map((i, index) => (
                <Draggable key={i} draggableId={`${i}`} index={index}>
                  {(innerProvided) => (
                    <div
                      {...innerProvided.draggableProps}
                      {...innerProvided.dragHandleProps}
                    >
                      <div
                        ref={innerProvided.innerRef}
                        style={{
                          border: '1px solid #f0f0f0',
                          height: '65px',
                        }}
                        className="flex items-center ph3 pv2 mb3 bg-white"
                      >
                        <div className="mr3">
                          <BarsOutlined style={{ fontSize: '25px' }} />
                        </div>
                        <div className="flex flex-column">
                          <span className="fw6 f5">{categories[i].name}</span>
                          <span className="light-silver">10 produtos</span>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default SortCategories

// 1. Pensar no tipo para persistir a ordenação
/**
 * (ordem das categorias, e a ordem dos produtos)
 * productId =>
 *
 * [{
 *  categoryIndex: number,
 *  productsIds: [string]
 * }]
 *
 */
// 3. Adicionar os typings no Tenant
// 2. Fazer a ordenação somente das categorias
