'use client';
import React, { ReactNode } from 'react';
import 'styles/App.css';
import 'styles/Contact.css';
import 'styles/MiniCalendar.css';
import 'styles/index.css';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import CustomAlert from 'components/customAlert/CustomAlert';
import { AuthWrapper } from './AuthWrapper';

import dynamic from 'next/dynamic';

const _NoSSR = ({ children }) => <React.Fragment>{children}</React.Fragment>;

const NoSSR = dynamic(() => Promise.resolve(_NoSSR), {
  ssr: false,
});

export default function AppWrappers({ children }: { children: ReactNode }) {

  return (
    <NoSSR>
      <Provider store={store}>
        <AuthWrapper>
          <CustomAlert />
          {children}
        </AuthWrapper>
      </Provider>
    </NoSSR>
  );
}