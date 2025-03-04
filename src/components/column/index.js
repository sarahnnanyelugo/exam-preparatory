// @flow
import React from 'react';
import styled, { css } from 'styled-components';
import { FlexCol } from '../globals';
import { MEDIA_BREAK } from '../layout';

const BaseColumn = styled(FlexCol)`
  margin: 32px 16px;
  align-items: stretch;

  @media (max-width: ${MEDIA_BREAK}px) {
    margin: 0;
    max-width: 100%;
  }

  ${p =>
    p.hideOnMobile &&
    css`
      @media screen and (max-width: ${MEDIA_BREAK}px) {
        display: none;
      }
    `};
`;

const PrimaryColumn = styled(BaseColumn)`
  min-width: 320px;
  flex: 2 1 60%;
  max-width: 640px;

  @media (max-width: ${MEDIA_BREAK}px) {
    width: 100%;
    max-width: 100%;
    margin-top: 2px;
    ${'' /* flex: auto; */} flex: none;
  }
`;

const SecondaryColumn = styled(BaseColumn)`
  min-width: 240px;
  flex: 1 1 30%;
  max-width: 320px;

  @media (max-width: ${MEDIA_BREAK}px) {
    flex: none;
    align-self: stretch;
    max-width: 100%;
  }
`;

const OnlyColumn = styled(PrimaryColumn)`
  max-width: 840px;
  flex: 0 0 75%;

  @media (max-width: ${MEDIA_BREAK}px) {
    flex: 1;
    min-width: 100%;
    width: 100%;
  }
`;

export const Column = (props: Object): React$Element<any> => {
  if (props.type === 'primary') {
    return <PrimaryColumn {...props}>{props.children}</PrimaryColumn>;
  } else if (props.type === 'secondary') {
    return <SecondaryColumn {...props}>{props.children}</SecondaryColumn>;
  } else if (props.type === 'only') {
    return <OnlyColumn {...props}>{props.children}</OnlyColumn>;
  } else {
    return <BaseColumn {...props}>{props.children}</BaseColumn>;
  }
};

export default Column;
