// @flow
import React from 'react';
import {
  A,
  StyledLink,
  StyledButton,
  StyledWhiteIconButton,
  StyledWhiteButton,
  StyledPrimaryButton,
  StyledWarnButton,
  StyledOutlineButton,
  StyledHoverWarnOutlineButton,
  StyledPrimaryOutlineButton,
  StyledWhiteOutlineButton,
  StyledTextButton,
  StyledFacebookButton,
  StyledTwitterButton,
} from './style';
import {Spinner} from "react-bootstrap";

const handleLinkWrapping = (Component, props) => {
  const { href, to,color='light', target, children, disabled, isLoading,isLoadingMsg,size='sm',onClick, ...rest } = props;
  const button = (
    <Component onClick={onClick} disabled={disabled || isLoading} {...rest}>
     <Spinner color={color} animation={'border'} className={!isLoading?"dis-none":''} size={size}>
      </Spinner>
      <span>
    {' '}{(isLoading && isLoadingMsg)?isLoadingMsg:children}
  </span>

    </Component>
  );

  if (href)
    return (
      <A
        href={href}
        target={target || '_blank'}
        rel={!target ? 'noopener noreferrer' : undefined}
      >
        {button}
      </A>
    );
  if (to) return <StyledLink to={to}>{button}</StyledLink>;
  return button;
};

type To = {
  pathname?: string,
  search?: string,
  state?: Object,
};

type Props = {
  target?: string,
  href?: string,
  to?: string | To,
  children: React$Node,
  disabled?: boolean,
  isLoading?: boolean,
  size?: 'small',
};

export const Button = (props: Props) => handleLinkWrapping(StyledButton, props);

export const WhiteIconButton = (props: Props) =>
  handleLinkWrapping(StyledWhiteIconButton, props);

export const WhiteButton = (props: Props) =>
  handleLinkWrapping(StyledWhiteButton, props);

export const PrimaryButton = (props: Props) =>
  handleLinkWrapping(StyledPrimaryButton, props);

export const WarnButton = (props: Props) =>
  handleLinkWrapping(StyledWarnButton, props);

export const OutlineButton = (props: Props) =>
  handleLinkWrapping(StyledOutlineButton, props);

export const PrimaryOutlineButton = (props: Props) =>
  handleLinkWrapping(StyledPrimaryOutlineButton, props);

export const WhiteOutlineButton = (props: Props) =>
  handleLinkWrapping(StyledWhiteOutlineButton, props);

export const HoverWarnOutlineButton = (props: Props) =>
  handleLinkWrapping(StyledHoverWarnOutlineButton, props);

export const TextButton = (props: Props) =>
  handleLinkWrapping(StyledTextButton, props);

export const FacebookButton = (props: Props) =>
  handleLinkWrapping(StyledFacebookButton, props);

export const TwitterButton = (props: Props) =>
  handleLinkWrapping(StyledTwitterButton, props);
