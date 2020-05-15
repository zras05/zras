import * as React from "react";
const styled = require("styled-components");

const color = '#445793';

const second = 2

const num = 12

const rotating = styled.keyframes` 
  {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const getChild = () => {
  let str = ``
  for (let i = 1; i < num; i++) {
    if (i) {
      str += `
      &:nth-child(${i}) {
        transform: rotate(${i * 360 / num}deg);
        animation-delay: ${(second / num) * (i - num)}s;
      }`
    }
  }
  return str
}
const Item = styled.default.div`
  transform-origin: 30px 30px;
  animation: ${rotating} ${second}s linear infinite;
  &:after {
    content: " ";
    display: block;
    position: absolute;
    top: 5px;
    left: 28px;
    width: 5px;
    height: 15px;
    border-radius: 5px;
    background: ${color};
  }
  ${getChild()}
`

const Wrap = styled.default.div`
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;
`;

const itemList = new Array(num).fill(1).map((item, index) => index)

export const Loading = () => {
  return (
    <Wrap>
      {
        itemList.map((index) => (<Item key={index}/>))
      }
    </Wrap>
  )
}