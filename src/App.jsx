// Init
import React from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Files
import Index from './routes/index';
import './css/index.css';

import 'plyr-react/dist/plyr.css';

// Component
function App() {
  return (
    <div className="App">
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
    </div>
  );
}

// Export
export default App;
