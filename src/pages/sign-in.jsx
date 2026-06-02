import React from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import AuthShell from '../components/AuthShell';
import AuthCard from '../components/AuthCard';

function App() {
  return (
    <AuthShell>
      <AuthCard
        mode="sign-in"
        title="Sign in to your account"
        googleLabel="Sign in with Google"
        tailLeading="Don't have an account?"
        tailLinkText="Sign up"
        tailHref="https://insightis-app.devart.info/register"
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
