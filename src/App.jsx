import React, { useState } from 'react';
import FaceTracking from './componants/FaceTracking.jsx';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    
    switch (activeTab) {
      case 'home':
        return (
          <div>
            <h2>Welcome to Face Tracking PWA</h2>
            <button onClick={() => setActiveTab('faceTracking')}>Start Face Tracking</button>
          </div>
        );
      case 'faceTracking':
        return <>
                <FaceTracking />
              </>;
      case 'about':
        return <h2>About This App</h2>;
      default:
        return <h2>Page Not Found</h2>;
    }
  };

  return (
    <div className="App">
      <nav className="menu-bar">
        <ul>
          <li><button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'active' : ''}>Home</button></li>
          <li><button onClick={() => setActiveTab('faceTracking')} className={activeTab === 'faceTracking' ? 'active' : ''}>Face Tracking</button></li>
          <li><button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>About</button></li>
        </ul>
      </nav>
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;