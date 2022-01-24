import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styled, { useTheme } from 'styled-components';

import { DiaryCardTypes, THIRTY_MINUTES_TIME } from '../../../constant';
import { TodoOutput } from '../../../graphQL/types';

type StyleType = 'drag' | 'none';

const StyledDiaryCard = styled.div<{
  styleType: StyleType;
  height: number;
  left: number;
  top: number;
  parentWidth: number;
  isDragging: boolean;
}>`
  position: ${({ styleType }) => (styleType === 'drag' ? null : 'absolute')};
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;

  width: ${({ parentWidth }) => parentWidth}px;
  height: ${({ height }) => height}px;

  display: ${({ isDragging }) => (isDragging ? 'none' : 'flex')};
  flex-direction: column;
  justify-content: center;
  align-content: center;

  color: ${({ theme }) => theme.colors.purple1};

  border: 0.5px solid ${({ theme }) => theme.colors.grey3};
  box-sizing: border-box;

  padding: 0px 0px 0px 20px;

  z-index: ${({ isDragging }) => (isDragging ? 1000 : undefined)};
`;

type PropTypes = {
  styleType: StyleType;
  todo: TodoOutput;
  originalIndex: number;
  parentWidth: number;
  height: number;
  today: Date;
  left: number;
  isTimeUndecided?: boolean;
};

export const DiaryCard: FC<PropTypes> = ({
  styleType,
  todo,
  originalIndex,
  parentWidth,
  today,
  height,
  left,
  isTimeUndecided = false,
}): JSX.Element => {
  const theme = useTheme();

  const timeToString = (timestamp?: number) => {
    if (!timestamp) {
      return '';
    }

    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();

    const str = `${hour}시`;

    if (minute > 0) {
      return `${str} ${minute}분`;
    }

    return str;
  };

  const getTop = useCallback(
    (startedAt?: number, finishedAt?: number): number => {
      let top = isTimeUndecided ? 180 : 0;
      if (!startedAt || !finishedAt) {
        return top + 60 + originalIndex * 30;
      }

      const year = today.getFullYear();
      const month = today.getMonth();
      const date = today.getDate();

      const zeroTimeToday = +new Date(year, month, date, 0, 0, 0);

      top += Math.floor((startedAt - zeroTimeToday) / THIRTY_MINUTES_TIME) * 30;

      return top;
    },
    [todo],
  );

  const { startedAt, finishedAt } = todo;
  const startedStr = timeToString(startedAt);
  const finishedStr = timeToString(finishedAt);

  const top = getTop(startedAt, finishedAt);

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: DiaryCardTypes.TODO,
    item: () => ({
      item: { ...todo },
      originalIndex,
      today,
    }),
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  return (
    <StyledDiaryCard
      styleType={styleType}
      height={height}
      top={top}
      left={left}
      ref={drag}
      parentWidth={parentWidth ?? 0}
      isDragging={isDragging}
    >
      <span
        style={{
          width: '100%',
          height: 'auto',
          fontSize: 16,
          fontFamily: theme.fonts.spoqaHanSansNeo,
        }}
      >
        {todo.contents}
      </span>
      {height > 30 && (
        <span
          style={{
            width: '100%',
            height: 'auto',
            fontSize: 12,
            fontFamily: theme.fonts.spoqaHanSansNeo,
          }}
        >
          {startedStr} ~ {finishedStr}
        </span>
      )}
    </StyledDiaryCard>
  );
};