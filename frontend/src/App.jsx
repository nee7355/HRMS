import { RouterProvider, useLocation } from 'react-router-dom';

// @project
import Notistack from '@/components/third-party/Notistack';
import { ConfigProvider } from '@/contexts/ConfigContext';
import { Provider, useDispatch } from 'react-redux';

import router from '@/routes';
import ThemeCustomization from '@/themes';
import { store } from './store/store';
import { useEffect } from 'react';
import AuthInitializer from './views/pages/auth/AuthInitializer';


function App() {

  return (
    <>
      <Provider store={store}>
        <AuthInitializer>
        <ConfigProvider>
          <ThemeCustomization>
            <Notistack>
              <RouterProvider router={router} />
            </Notistack>
          </ThemeCustomization>
        </ConfigProvider>
        </AuthInitializer>
      </Provider>
    </>
  );
}

export default App;
