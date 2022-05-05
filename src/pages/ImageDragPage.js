import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
  display: flex;

  #canvas {
    width: 700px;
    height: 900px;
    background-image: url('https://user-images.githubusercontent.com/85756211/166623844-74ee80f9-14c5-4b82-a785-60b3f88f1c37.jpg');
    background-size: cover;
  }
`;

const MemoArea = styled.div`
  background-color: #f5f5f5;
  padding: 10px 20px;
  margin: 20px;
  height: fit-content;
  text-align: left;
`;

const MemoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const MemoText = styled.p`
  margin: 10px 20px 10px 0;
  flex-grow: 1;
`;

const ImageDragPage = () => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [itemBoxes, setItemBoxes] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  //로컬 스토리지에 아이템 저장
  const setItem = itemBox => {
    window.localStorage.setItem('itemBox', JSON.stringify(itemBox));
  };
  //로컬 스토리지에서 아이템 가져오기
  const getItem = () => {
    return JSON.parse(window.localStorage.getItem('itemBox'));
  };

  const editItemBoxName = id => {
    const changeName = prompt('변경할 이름을 적어주세요');
    if (changeName) {
      const newItems = itemBoxes.map((box, index) => {
        if (index === id) {
          const newBox = {
            ...box,
            name: changeName,
          };
          return newBox;
        } else {
          return box;
        }
      });
      setItemBoxes(newItems);
      setItem(newItems);
    }
  };

  const deleteItemBox = id => {
    const check = window.confirm('삭제하시겠습니까?');
    if (check) {
      const deleteItem = itemBoxes.filter((box, index) => index !== id);
      setItemBoxes(deleteItem);
      setItem(deleteItem);
    }
  };

  const getNewBox = (startX, startY) => {
    return {
      //x,y순서는 상관 없는 듯
      startY,
      startX,
      width: 0,
      height: 0,
    };
  };

  //캔버스 안에서 마우스를 누를 때(그리기 시작)
  const onMouseDown = event => {
    //브라우저 고유 이벤트 필요시 nativeEvent 사용
    const startX = event.nativeEvent.offsetX;
    const startY = event.nativeEvent.offsetY;
    const newBox = getNewBox(startX, startY);
    setItemBoxes([...itemBoxes, newBox]);
    setIsClicked(true);
  };

  //캔버스에서 마우스를 뗄 때(그리기 끝)
  const onMouseUp = event => {
    let endX = event.nativeEvent.offsetX;
    let endY = event.nativeEvent.offsetY;

    const cloneBoxes = [...itemBoxes];
    const currentBox = cloneBoxes[cloneBoxes.length - 1];

    if (currentBox.startX === endX || currentBox.startY === endY) {
      //클릭만 하는경우(드래그해서 그림 안그리는 경우===취소)
      cancelDraw();
      return;
    }
    const name = prompt('영역의 이름은 무엇인가요?');
    if (!name) {
      //입력 안하면 취소
      cancelDraw();
      return;
    }
    currentBox.name = name;
    setItemBoxes([...cloneBoxes]);
    setItem([...cloneBoxes]);
    setIsClicked(false);
  };

  //캔버스 내에서 움직일 때
  const onMouseMove = event => {
    if (!isClicked) {
      return;
    }
    const currentX = event.nativeEvent.offsetX;
    const currentY = event.nativeEvent.offsetY;

    const cloneBoxes = [...itemBoxes];
    const currentBox = cloneBoxes[cloneBoxes.length - 1];

    const width = currentX - currentBox.startX;
    const height = currentY - currentBox.startY;

    currentBox.width = width;
    currentBox.height = height;

    setItemBoxes([...cloneBoxes]);
  };

  // 캔버스 영역에서 나갈 때
  const onMouseOut = () => {
    if (isClicked) cancelDraw();
  };
  const cancelDraw = () => {
    const cloneBoxes = [...itemBoxes];
    cloneBoxes.pop();
    setItemBoxes([...cloneBoxes]);
    setIsClicked(false);
  };

  //캔버스 기본 설정
  useEffect(() => {
    if (!canvasRef.current) {
      //캔버스 지원안할 시 아무것도 리턴안함
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#f22672';
    ctx.fillStyle = '#F2267230';
    setCtx(ctx);
  }, []);

  useEffect(() => {
    //itemBoxes 최신화
    const newItemBoxes = getItem();
    if (newItemBoxes) {
      setItemBoxes(newItemBoxes);
    }
  }, []);

  //캔버스 도형 그리고 localStorage에 저장된 후 설정
  useEffect(() => {
    if (!ctx) return;
    //다시 렌더링할 경우 현재 값을 초기화시키기
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    itemBoxes.forEach(box => {
      //그리고 저장된 후 박스 style 설정
      ctx.strokeStyle = '#1ed5e2';
      ctx.fillStyle = 'rgba(148,245,96,0.3)';
      if (!box.name) {
        //그리는 중 박스 style 설정
        ctx.strokeStyle = '#ef2e77';
        ctx.fillStyle = 'rgba(239,45,116,0.3)';
      }
      //설정 후 그리기
      ctx.fillRect(box.startX, box.startY, box.width, box.height);
      ctx.strokeRect(box.startX, box.startY, box.width, box.height);

      if (box.name) {
        //박스 안 글씨 설정
        ctx.fillStyle = '#000';
        ctx.font = 'bold 16px Roboto';
        if (box.width < 0) {
          if (box.height < 0) {
            ctx.fillText(
              box.name,
              box.startX + 5 + box.width,
              box.startY + 20 + box.height,
            );
          } else {
            ctx.fillText(box.name, box.startX + 5 + box.width, box.startY + 20);
          }
        } else if (box.width > 0) {
          if (box.height < 0) {
            ctx.fillText(
              box.name,
              box.startX + 5,
              box.startY + 20 + box.height,
            );
          } else {
            ctx.fillText(box.name, box.startX + 5, box.startY + 20);
          }
        }
      }
    });
  }, [itemBoxes, ctx]);

  return (
    <Container>
      <canvas
        id='canvas'
        width='700'
        height='900'
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseOut}
      ></canvas>
      {itemBoxes && itemBoxes.length > 0 && (
        <MemoArea>
          {itemBoxes &&
            itemBoxes?.map((itemBox, id) => (
              <div key={id}>
                {itemBox.name && (
                  <MemoWrapper>
                    <MemoText>{itemBox.name}</MemoText>
                    <EditIcon onClick={() => editItemBoxName(id)} />
                    <DeleteIcon onClick={() => deleteItemBox(id)} />
                  </MemoWrapper>
                )}
              </div>
            ))}
        </MemoArea>
      )}
    </Container>
  );
};

export default ImageDragPage;
