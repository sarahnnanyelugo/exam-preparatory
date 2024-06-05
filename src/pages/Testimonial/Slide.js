import React from "react";
import styled from "@emotion/styled";
import { Spring, animated } from "react-spring/renderprops";
import { withGesture } from "react-with-gesture";

const SlideContainer = styled.div`
  position: absolute;
  height: 70%;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
`;

const SlideCard = styled.div`
  position: relative;
  padding: 30px 40px;
  width: 380px;
  height: fit-content;
  background: white;
  font-size: 35px;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
  box-shadow: 0px 3px 6px #0000000d;
  border: 1px solid #e7e7e7;
  border-radius: 20px;
  opacity: 1;
  @media screen and (min-width: 620px) {
    width: 520px;
  }
`;

function Slide({
  content,
  photo,
  testifier,
  offsetRadius,
  index,
  animationConfig,
  moveSlide,
  delta,
  down,
  up,
}) {
  const offsetFromMiddle = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  const distanceFactor = 1 - Math.abs(offsetFromMiddle / (offsetRadius + 1));

  const offsetCardClick = (i) => {
    // console.log(i);
  };

  const translateYoffset =
    50 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1));
  let translateY = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateY = 0;
    } else if (index === totalPresentables - 1) {
      translateY = -100;
    }
  }

  if (offsetFromMiddle === 0 && down) {
    translateY += delta[1] / (offsetRadius + 1);
    if (translateY > -40) {
      moveSlide(-1);
    }
    if (translateY < -100) {
      moveSlide(1);
    }
  }
  if (offsetFromMiddle > 0) {
    translateY += translateYoffset;
  } else if (offsetFromMiddle < 0) {
    translateY -= translateYoffset;
  }

  return (
    <Spring
      to={{
        transform: `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`,
        top: `${
          offsetRadius === 0 ? 50 : 50 + (offsetFromMiddle * 50) / offsetRadius
        }%`,
        opacity: distanceFactor * distanceFactor,
      }}
      config={animationConfig}
    >
      {(style) => (
        <SlideContainer
          style={{
            ...style,
            zIndex: Math.abs(Math.abs(offsetFromMiddle) - 2),
          }}
        >
          <SlideCard onClick={() => moveSlide(offsetFromMiddle)}>
            <center>
              {" "}
              <p>{content}</p>
            </center>
            <center>
              <h6>
                <img src={photo} alt="user" width="44px" />
                {testifier}
              </h6>
            </center>
          </SlideCard>
        </SlideContainer>
      )}
    </Spring>
  );
}

export default withGesture()(Slide);
