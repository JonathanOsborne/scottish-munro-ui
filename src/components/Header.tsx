import React from 'react';
import { Header } from 'semantic-ui-react';
import { HeaderBox } from '@/styles/styles';

interface HeaderProps {
  title: string;
}

export const StandardHeader = ({ title }: HeaderProps) => (
  <HeaderBox>
    <Header as="h1" textAlign="center" className="">
      {title}
    </Header>
  </HeaderBox>
);
