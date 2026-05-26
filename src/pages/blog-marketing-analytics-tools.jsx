import React from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import BlogPost from '../components/BlogPost';
import md from '../../blog/Articles/marketing-analytics-tools.md?raw';

function App() { return <BlogPost markdown={md} slug="marketing-analytics-tools" />; }
export default App;

if (typeof window !== 'undefined') {
  const el = document.getElementById('root');
  if (el && el.hasChildNodes()) {
    ReactDOM.hydrateRoot(el, <App />);
  } else if (el) {
    ReactDOM.createRoot(el).render(<App />);
  }
}
