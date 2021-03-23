import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.scss';
// import '../styles/variables.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
