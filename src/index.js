import React, { useState } from "react";
import { useSpring, animated as a } from "react-spring";
import styled, { css } from "styled-components";

import ReactDOM from "react-dom";

import "./styles.css";
/*
This is very important
stuff down here
*/

const size = {
  small: 420,
  med: 980,
  large: 1140
};
const above = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${size[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
const data = [
  {
    id: 1,
    name: "Fake Name",
    age: 30,
    description:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but becauseruuaarrua",

    img:
"https://the-flow.ru/uploads/images/resize/830x0/adaptiveResize/11/23/86/67/87/b70d89140cd7.jpg"
  },
  {
    id: 2,

    name: "Hasssh Hook",
    description:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because",
    age: 37,
    img:
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCE7W63KVnPzyM3_BBUzevP2IkvpMsxSDWfx99qDNGXku71Bf3nw"
  },
  {
    id: 3,

    name: "Hasssh Hook",
    description:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because",
    age: 37,
    img: "https://v1.popcornnews.ru/k2/news/970/upload/SC5SkA.jpg"
  },
  {
    id: 4,

    name: "Hasssh Hook",
    description:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because",
    age: 37,
    img: "http://brovinka.ru/img/139_img1.jpg"
  },
  {
    id: 5,

    name: "Hasssh Hook",
    description:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because",
    age: 37,
    img: "data:image/jpeg;base64,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"
  },
  {
    id: 6,

    name: "Hasssh Hook",
    description:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because",
    age: 37,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT89OG5DutNU_ggTbwNio3WXvYClMtr5VbdfWRaT9d-j8sxlx3l"
  }
];

const Image = styled.img`
  max-width: 100%;
  width: 100%;
`;

const StyledDiv = styled.div`
 
  background-color: #eafd3f;
 
  ${above.large`
   width:31%;
   margin:0% 0 0 0.5% ;
  
   border-bottom:4px solid #343434;
   `}
  ${above.med`
  width:48%;
  
  border-bottom:4px solid #343434;
  margin: 1% 0 0 1%;
  `}
 
  ${above.small`
  width:98%;
  border-bottom:4px solid #343434;
  margin: 0.5% 0 0 0.5%;

  `}
  `;
const AnimatedP = ({ animation, description }) => {
  return (
    <>
      <a.p style={animation}>{description}</a.p>
    </>
  );
};
const StyledPar = styled(AnimatedP)`
  background-color: #fff;
  margin: 2% 2% 2% 2%;
  padding: 20px;
  font-family: "Roboto sans-serif";
`;
const Button = styled.button`
  width: 40%;
  cursor: pointer;
  margin: 5% 0% 4% 50%;
  border: none;
  font-size: 1.4em;
  color: #fff;
  font-family: "Arial sans-serif";

  background-color: #b53ad4;

  padding: 5% 5% 5% 5%;
`;
const StyledHeader = styled.h2`
  color: #b53ad4;
  margin: 2px;
  padding: 6%;
`;

const StyledSVG = styled.svg`
  position: absolute;
  top: 6px;
  left: -10px;
  width: 100px;
  height: 100px;
`;
const StyledSpan = styled.span`
  color: silver;
  position: relative;
  margin-left: 5px;

  font-weight: bold;
  padding: 7% 7% 7% 4%;
`;
const Item = ({ img, name, description, age }) => {
  const [visible, setVisible] = useState(false);

  const animation = useSpring({
    opacity: visible ? 1 : 0,
    y: visible ? 0 : 100,
    color: "#B53AD4",
    margin: "2px 12px 12px 2px"
  });
  const { length } = useSpring({
    length: visible ? 0 : 189
  });
  return (
    <StyledDiv>
      <Image src={img} />
      <StyledHeader>{name}</StyledHeader>
      <StyledSpan>
        <StyledSVG>
          <a.path
            fill="none"
            stroke-dashoffset={length}
            stroke-dasharray="189"
            stroke="#b53ad4"
            stroke-width="5"
            d="M10,40a30,30 0 1,0 60,0a30,30 0 1,0 -60,0"
          />
        </StyledSVG>
        {age}
      </StyledSpan>

      <Button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        Show Info
      </Button>
      <StyledPar
        animation={{
          ...animation,
          transform: animation.y.interpolate(y => `translate3d(0,${y}px,0)`)
        }}
        description={description}
      />
    </StyledDiv>
  );
};
const StyledItem = styled(Item)`
  width: 100%;
  font-family: "Roboto sans-serif";
`;

const AppWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content:space-evenly;
  flex-wrap: wrap;
  
  
`;

function App() {
  return (
    <AppWrapper>
      {data.map(({ name, description, img, age, id }, i) => {
        return (
          <StyledItem
            key={id}
            name={name}
            description={description}
            age={age}
            img={img}
          />
        );
      })}
    </AppWrapper>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
