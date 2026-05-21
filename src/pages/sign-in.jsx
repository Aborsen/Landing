import React from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthCard from '../components/AuthCard';

function App() {
  return (
    <div className="font-body">
      <Header />
      <main>
        <AuthCard
          mode="sign-in"
          title="Sign in to your account"
          googleLabel="Sign in with Google"
          tailLeading="Don't have an account?"
          tailLinkText="Sign up"
          tailHref="/auth/sign-up/"
        />
      </main>
      <Footer />
    </div>
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
