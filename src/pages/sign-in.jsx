import React from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import AuthShell from '../components/AuthShell';
import AuthCard from '../components/AuthCard';

function App() {
  return (
    <AuthShell>
      <AuthCard
        title="Insightis is launching soon"
        blurb="Sign-in isn't available just yet. Leave your email and we'll let you know the moment you can log in."
        ctaLabel="Notify me at launch"
        toastMsg="Thanks! We'll email you the moment sign-in is ready."
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
