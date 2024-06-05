// @flow
import theme from '../theme';
import React from 'react';
import styled from 'styled-components';
import { FlexCol } from '../globals';
import { MEDIA_BREAK } from '../layout';

const StyledCard = styled(FlexCol)`
  background: ${theme.bg.default};
  position: relative;
  width: 100%;
  max-width: 100%;
  background-clip: padding-box;
  overflow: visible;
  flex: none;

  @media (max-width: ${MEDIA_BREAK}px) {
    border-radius: 0;
    box-shadow: none;
  }
`;

const CardPure = (props: Object): React$Element<any> => (
  <StyledCard {...props}>{props.children}</StyledCard>
);

export const Card = CardPure;
export default Card;
