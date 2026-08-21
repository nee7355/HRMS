import { RouterProvider, useLocation } from 'react-router-dom';

// @project
import Notistack from '@/components/third-party/Notistack';
import { ConfigProvider } from '@/contexts/ConfigContext';
import {Provider} from 'react-redux';

import router from '@/routes';
import ThemeCustomization from '@/themes';
import { store } from './store/store';


function App() {
  return (
    <>
    <Provider store={store}>
      <ConfigProvider>
        <ThemeCustomization>
          <Notistack>
            <RouterProvider router={router} />
          </Notistack>
        </ThemeCustomization>
      </ConfigProvider>
      </Provider>
    </>
  );
}

export default App;
