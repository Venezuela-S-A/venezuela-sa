import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import InteractiveFooter from '@site/src/components/InteractiveFooter';

export default function LayoutWrapper(props) {
  return (
    <>
      <Layout {...props} />
      <InteractiveFooter />
    </>
  );
}
