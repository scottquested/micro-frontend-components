import { createRoot } from 'react-dom/client';
import './app.css';

const mfeComponents = document.getElementById('micro-frontend-components');

if (mfeComponents) {
  const root = createRoot(mfeComponents);

  root.render(
    <div>
      <header className="text-5xl">Testing components here</header>
    </div>
  );
}
