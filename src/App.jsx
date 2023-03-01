// Init
import React from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import { I18nextProvider } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

// Files
import Index from './routes/index';
import './css/index.css';

import 'plyr-react/dist/plyr.css';
import i18next from './utils/i18n';

// Component
function App() {
  return (
    <div className="App">
      <I18nextProvider i18n={i18next}>
        {/* toastify Container for Notification */}
        <ToastContainer
          position="bottom-right"
          limit="4"
          autoClose={2000}
          hideProgressBar
          transition={Flip}
        />

        {/* Routes */}
        <Index />
      </I18nextProvider>
    </div>
  );
}

// Export
export default App;
