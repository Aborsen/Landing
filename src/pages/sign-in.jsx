import React from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import AuthShell from '../components/AuthShell';
import AuthCard from '../components/AuthCard';

function App() {
  return (
    <AuthShell>
      <AuthCard
        title="Sign-in is coming soon"
        blurb="Insightis isn't live just yet — we're putting the finishing touches on it. Check back shortly to log in."
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
