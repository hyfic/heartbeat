import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <Router>
      <h2>Common</h2>
      <Routes>
        <Route
          path='/'
          element={
            <div>
              <h2>home page</h2>
              <Link to='/sample'>sample page</Link>
            </div>
          }
        />
        <Route
          path='/sample'
          element={
            <div>
              <h2>sample page</h2>
              <Link to='/'>home page</Link>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};
