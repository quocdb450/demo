/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './routes/AppStack';
import {QueryClient, QueryClientProvider} from 'react-query';

function App(): React.JSX.Element {
  const queryClient = new QueryClient();
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <AppStack />
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
