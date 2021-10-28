import styled from 'styled-components';
import { Category, CreateTodo, UpdateTodo } from '../../../types';
import { consoleLog } from '../../../utils';
import { ColorCircle } from '../../atoms';

const StyledCategorySelectMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  width: 90%;
  height: 340px;
  top: 125px;
  background: #ffffff;
  border: 0.5px solid #afafaf;
  box-sizing: border-box;
  border-radius: 20px;
`;

const StyledCategorySelectMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background: red; */
  margin-top: 51px;
  width: 100%;
  height: 279px;
  border: 0;
  z-index: 3;
  top: 0px;
  border-top: 0.5px solid #afafaf;

  overflow-y: auto;
  overflow-x: visible;

  /* scroll styling */
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6c2ff;
  }

  ::-webkit-scrollbar-track {
    background-color: #bfbfbf;
  }
  /* fireFox scroll style*/
  scrollbar-width: thin;
  scrollbar-color: #d6c2ff #bfbfbf;
`;

const StyledCategorySelectMenuItem = styled.div`
  display: flex;
  width: 90%;
  height: 40px;
  min-height: 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

interface PropTypes {
  categories?: Category[];
  todo: UpdateTodo | CreateTodo;
  setUpdateTodo: (value: React.SetStateAction<UpdateTodo>) => void;
  onCloseMenu: () => void;
}

export const CategorySelectMenu = ({
  categories = [],
  todo,
  setUpdateTodo = () => {},
  onCloseMenu = () => {},
}: PropTypes): JSX.Element => {
  return (
    <StyledCategorySelectMenuWrapper>
      <StyledCategorySelectMenu>
        <StyledCategorySelectMenuItem />
        {categories.map((category) => (
          <StyledCategorySelectMenuItem
            key={category.id}
            onClick={() => {
              setUpdateTodo({
                ...(todo as UpdateTodo),
                Category: {
                  ...(todo as UpdateTodo).Category,
                  id: category.id,
                  name: category.name,
                  color: category.color,
                },
              });
              onCloseMenu();
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <ColorCircle
                width={20}
                height={20}
                borderRadius={100}
                backgroundColor={category.color}
              />
              <span
                style={{
                  marginLeft: 10,
                  fontSize: 18,
                }}
              >
                {category.name}
              </span>
            </div>
            <span>체크버튼</span>
          </StyledCategorySelectMenuItem>
        ))}
      </StyledCategorySelectMenu>
    </StyledCategorySelectMenuWrapper>
  );
};