import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useLocalStorage } from "../hooks/useLocalStorage.js";
import Modal from "./Modal";
import image from "../images/image.webp";

const Canvas = () => {
  // LocalStorage 커스텀 훅
  const [storage, setLocalStorage] = useLocalStorage("boxes", []);
  // boxes = [{name: String, startX: number, startY: number, width: number, height: height}, ...]
  const [boxes, setBoxes] = useState(storage);
  const [isModal, setIsModal] = useState(null);
  const len = boxes.length;

  // 이벤트 요소 가지고 오기
  const object = useRef();

  // 영역 선택 중인지 확인(드래그 중인지 확인)
  const isClick = useRef(false);

  useEffect(() => {
    const canvas = object.current;

    // HTMLCanvasElement.getContext() 메소드는 캔버스의 드로잉 컨텍스트를 반환
    const ctx = canvas.getContext("2d");

    // 선택영역을 투명하게 하기 위해 => 요소 전체 영역 선택 후 투명하게 함
    // clearRect(x, y, width, height) : 특정 부분을 지우는 직사각형이며, 이 지워진 부분은 완전히 투명해짐
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // LocalStorage 저장된 boxes
    boxes.forEach((box, index) => {
      // strokeStyle = color : 도형의 윤곽선 색을 설정
      // fillStyle = color : 도형을 채우는 색을 설정
      ctx.strokeStyle = "rgb(124,213,246)";
      ctx.fillStyle = "#8bdb1c3f";

      // LocalStorage 저장된 boxes의 마지막 요소이며, 아직 영역선택(드래그)이 안끝났다면
      if (index === boxes.length - 1 && isClick.current) {
        // strokeStyle = color : 도형의 윤곽선 색을 설정
        // fillStyle = color : 도형을 채우는 색을 설정
        ctx.strokeStyle = "#f34d98";
        ctx.fillStyle = "rgba(248,156,197,0.2)";
      }

      // strokeRect(x, y, width, height) : 직사각형 윤곽선을 그림
      // fillRect(x, y, width, height) : 색칠된 직사각형을 그림
      ctx.strokeRect(box.startX, box.startY, box.width, box.height);
      ctx.fillRect(box.startX, box.startY, box.width, box.height);

      // text가 있다면
      if (box.name) {
        // fillStyle = color : 도형을 채우는 색을 설정
        ctx.fillStyle = "black";
        ctx.font = "bold 18px Roboto";

        // fillText(text, x, y [, maxWidth]) : 주어진 (x, y) 위치에 주어진 텍스트를 채움. 최대 폭(width)은 옵션 값.
        ctx.fillText(box.name, box.startX + 5, box.startY + 20);
      }
    });

    setLocalStorage(boxes);
  }, [boxes, setLocalStorage]);

  // onMouseDown 이벤트 : x,y 좌표 구하기
  // offsetX, offsetY : 이벤트 대상이 기준
  // { nativeEvent } = event.nativeEvent => offsetX, offset은 event.nativeEvent안에 있음
  const startPoint = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const box = {
      startX: offsetX,
      startY: offsetY,
      width: 0,
      height: 0,
    };
    isClick.current = true;
    setBoxes([...boxes, box]);
  };

  // width, height, name 값 할당하기
  const setPoint = (offsetX, offsetY, name = "") => {
    // boxes[len - 1] => boxes의 마지막 요소
    const width = offsetX - boxes[len - 1].startX;
    const height = offsetY - boxes[len - 1].startY;

    boxes[len - 1].width = width;
    boxes[len - 1].height = height;
    boxes[len - 1].name = name;
    setBoxes([...boxes]);
  };

  // onMouseMove 이벤트 : 영역 선택 중인 canvas를 보여주기 위해
  // offsetX, offsetY : 이벤트 대상이 기준
  // { nativeEvent } = event.nativeEvent => offsetX, offset은 event.nativeEvent안에 있음
  const movePoint = ({ nativeEvent }) => {
    if (isClick.current) {
      const { offsetX, offsetY } = nativeEvent;
      setPoint(offsetX, offsetY);
    }
  };

  // onMouseUp 이벤트 : width, height 값 구하기
  // offsetX, offsetY : 이벤트 대상이 기준
  // { nativeEvent } = event.nativeEvent => offsetX, offset은 event.nativeEvent안에 있음
  const endPoint = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    // 클릭시 영역 선택 방지
    if (
      boxes[len - 1].startX === offsetX ||
      boxes[len - 1].startY === offsetY
    ) {
      cancel();
      return;
    }

    const name = prompt("영역의 이름은 무엇인가요?");
    if (!name) {
      cancel();
      return;
    }

    setPoint(offsetX, offsetY, name);
    isClick.current = false;
  };

  // onMouseLeave 이벤트 : 이벤트 요소 영역 밖으로 이동시
  const cancel = () => {
    if (isClick.current) {
      const deleteBox = [...boxes];
      deleteBox.pop();
      setBoxes(deleteBox);
      isClick.current = false;
    }
  };

  // Modal 이벤트 : 업데이트 시
  const updateBox = (name, index) => {
    const newBoxes = boxes.map((item, idx) => {
      if (idx === index) {
        item.name = name;
      }
      return item;
    });
    setBoxes(newBoxes);
  };

  // Modal 이벤트 : 삭제 시
  const removeBox = (index) => {
    const deleteBox = boxes.filter((_, idx) => idx !== index);
    setBoxes(deleteBox);
  };

  return (
    <Wrap>
      <canvas
        id="canvas"
        ref={object}
        onMouseDown={startPoint}
        onMouseMove={movePoint}
        onMouseUp={endPoint}
        onMouseLeave={cancel}
        width="600"
        height="750"
      ></canvas>
      <List>
        <div>
          <h2>
            {boxes.length > 0
              ? "✔ 선택 영역 리스트"
              : "🔥 영역을 선택해 주세요!!"}
          </h2>
          <ul>
            {boxes.map((item, index) => {
              if (item.name) {
                return (
                  <li key={index}>
                    <p onClick={() => setIsModal(index)}>
                      {index + 1}. {item.name}
                    </p>
                    {index === isModal ? (
                      <Modal
                        name={item.name}
                        index={index}
                        removeBox={removeBox}
                        updateBox={updateBox}
                        setIsModal={setIsModal}
                      />
                    ) : null}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </List>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  width: 60%;
  #canvas {
    background-image: url(${image});
    background-size: contain;
  }
`;

const List = styled.div`
  flex: 1 1 204px;
  margin: 10px 20px;
  border: 2px solid rgb(124, 213, 246);
  height: fit-content; // 자식요소의 높이값이 적용
  > div {
    color: #141214;
    background-color: #8bdb1c3f;
    font: 18px "Noto Sans", "Noto Sans KR", sans-serif;
  }
  h2 {
    font-weight: 600;
    padding: 10px 20px 0;
    text-align: center;
  }
  ul {
    padding: 10px 20px;
    list-style: none;
  }
  p {
    cursor: pointer;
    padding: 5px;
    font-weight: 600;
    word-wrap: break-word; //넘친 단어를 줄 바꿈
    :hover {
      color: #eff3f8;
      background-color: #96a5ff;
    }
  }
`;

export default Canvas;
