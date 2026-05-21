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
          mode="sign-up"
          title="Create your account"
          googleLabel="Sign up with Google"
          tailLeading="Already have an account?"
          tailLinkText="Sign in"
          tailHref="/auth/sign-in/"
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
