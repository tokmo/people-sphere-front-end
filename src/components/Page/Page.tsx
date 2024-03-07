import React from 'react';
import { Header } from '..';

interface PageProps {
  children: React.ReactNode | React.ReactNode[];
  title: string;
}

export const Page: React.FC<PageProps> = ({ children, title }) => {
  return (
    <div className="content">
      <div className="container">
        <Header title={title} />
        {children}
      </div>
    </div>
  );
};
