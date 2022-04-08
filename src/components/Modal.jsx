import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Modal = ({ name, index, removeBox, updateBox, setIsModal }) => {
  const [inputName, setInputName] = useState(name);

  // input 변경 이벤트
  const handleInput = useCallback((e) => {
    setInputName(e.target.value);
  }, []);

  // Modal 저장 버튼 클릭시 이벤트
  const handleUpdate = useCallback(() => {
    updateBox(inputName, index);
    setIsModal(null);
  }, [inputName, index, updateBox, setIsModal]);

  // Modal 삭제 버튼 클릭시 이벤트
  const handleRemove = useCallback(() => {
    removeBox(index);
    setIsModal(null);
  }, [index, removeBox, setIsModal]);

  return (
    <>
      <ModalBg onClick={() => setIsModal(null)}></ModalBg>
      <ModalBox>
        <h3>선택 영역 리스트</h3>
        <i onClick={() => setIsModal(null)}></i>
        <div>
          <label htmlFor="title">수정하기</label>
          <input
            id="title"
            type="text"
            value={inputName}
            onChange={handleInput}
          />
        </div>
        <BtnBox>
          <button onClick={handleUpdate}>저장</button>
          <button onClick={handleRemove}>삭제</button>
        </BtnBox>
      </ModalBox>
    </>
  );
};

Modal.propTypes = {
  name: PropTypes.string,
  index: PropTypes.number,
  removeBox: PropTypes.func,
  updateBox: PropTypes.func,
  setIsModal: PropTypes.func,
};

const ModalBg = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(51, 51, 51, 0.5);
  overflow: hidden;
  z-index: 1;
`;

const ModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 360px;
  padding: 20px;
  border-radius: 8px;
  margin: auto;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-sizing: border-box; //테두리와 안쪽 여백의 크기도 요소의 크기로 고려
  z-index: 10;
  h3 {
    margin-bottom: 30px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
  }
  label {
    display: block;
    margin-bottom: 8px;
    text-align: center;
    font-weight: bold;
    font-size: 15px;
  }
  input {
    width: 100%;
    height: 40px;
    padding: 10px;
    margin-bottom: 40px;
    border-radius: 6px;
    box-sizing: border-box; //테두리와 안쪽 여백의 크기도 요소의 크기로 고려
    resize: none;
  }
  i {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 10px;
    top: 10px;
    cursor: pointer;
    ::before,
    ::after {
      position: absolute;
      width: 2px;
      height: 25px;
      top: 5px;
      background-color: black;
      content: "";
    }
    ::before {
      right: 15px;
      transform: rotate(45deg);
    }
    ::after {
      right: 15px;
      transform: rotate(-45deg);
    }
  }
`;

const BtnBox = styled.div`
  display: flex;
  button {
    width: 50%;
    height: 40px;
    border: none;
    border-radius: 5px;
    color: #fff;
    background-color: mediumturquoise;
    cursor: pointer;
    :last-child {
      margin-left: 10px;
      background-color: #ff1493;
    }
  }
`;

export default Modal;
