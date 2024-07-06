import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import 'react-medium-image-zoom/dist/styles.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// REDUX
import { Provider } from 'react-redux';
import { store, persistor } from './store';
// REDUX-PERSIST
import { PersistGate } from 'redux-persist/integration/react';

// ROUTER
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        
          theme="light"
          transition={Bounce}
        />

        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
