import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import {
  log,
  logDebug,
  logError,
  logInfo,
  logSuccess,
  logWarning,
  setLogOptions,
} from '../../src/index';

export default function App() {
  React.useEffect(() => {
    setLogOptions({
      hasArrow: true,
      showBadge: true,
    });
    logSuccess('This is a success message');
    logSuccess('This is a success message with a object', {
      message: 'This is a success message with a object',
      name: 'Debulog',
    });

    logError('This is an error message');
    logError('This is an error message with a object', {
      name: 'Debulog',
      version: '1.0.0',
    });
    logWarning('This is a warning message');
    logWarning('This is a warning message with a object', {
      name: 'Debulog',
      version: '1.0.0',
    });
    logInfo('This is an info message');
    logInfo('This is an info message with a object', {
      name: 'Debulog',
      version: '1.0.0',
      author: 'Gustavo Bacellar',
    });
    logDebug('This is a debug message');
    logDebug('This is a debug message with a object', {
      name: 'Debulog',
      version: '1.0.0',
    });
    log('This is a default message');
    log('This is a default message with a object', {
      name: 'Debulog',
      version: '1.0.0',
    });
  }, []);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
