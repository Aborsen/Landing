import React from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import BlogPost from '../components/BlogPost';
import md from '../../blog/Articles/self-service-bi-guide.md?raw';

function App() { return <BlogPost markdown={md} slug="self-service-bi-guide" />; }
export default App;

if (typeof window !== 'undefined') {
  const el = document.getElementById('root');
  if (el && el.hasChildNodes()) {
    ReactDOM.hydrateRoot(el, <App />);
  } else if (el) {
    ReactDOM.createRoot(el).render(<App />);
  }
}
