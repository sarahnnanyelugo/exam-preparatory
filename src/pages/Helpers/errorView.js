// @flow
import React from 'react';
import {CenteredGrid, ViewGrid} from "../../components/layout";
import {Card} from "react-bootstrap";
import './errorView.scss'
// import { Emoji, Heading, Description, Card } from './style';

type Props = {
  emoji?: string,
  heading?: string,
  subheading?: string,
};

export const ErrorView = (props: Props) => {
  const {
    emoji = '😣',
    heading = 'We ran into trouble loading this page',
    subheading = props.msg?props.msg:'No Data Available',
    ...rest
  } = props;

  return (
    <ViewGrid {...rest}>
      <CenteredGrid>
        <Card className={"error-card"}>
          {subheading}
        </Card>
      </CenteredGrid>
    </ViewGrid>
  );
};
