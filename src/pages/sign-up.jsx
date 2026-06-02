import React from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import AuthShell from '../components/AuthShell';
import AuthCard from '../components/AuthCard';

function App() {
  return (
    <AuthShell>
      <AuthCard
        title="Sign-up is coming soon"
        blurb="Insightis isn't open to the public yet. We're almost there — check back soon to create your account."
      />
    </AuthShell>
  );
}

export default App;
if (typeof window !== 'undefined') {
  const el = document.getElementById('root');
  if (el && el.hasChildNodes()) {
    ReactDOM.hydrateRoot(el, <App />);
  } else if (el) {
    ReactDOM.createRoot(el).render(<App />);
  }
}
