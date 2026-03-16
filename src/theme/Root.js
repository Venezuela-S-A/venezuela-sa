import React from 'react';
import AuthProvider from '@site/src/contexts/AuthContext';
import AIChatWidget from '@site/src/components/AIChatWidget';
import AnalyticsTracker from '@site/src/components/AnalyticsTracker';

export default function Root({ children }) {
  return (
    <AuthProvider>
      {children}
      <AnalyticsTracker />
      <AIChatWidget />
    </AuthProvider>
  );
}
