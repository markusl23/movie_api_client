import { createRoot } from 'react-dom/client';
import './index.scss';

const MovieApiApplication = () => {
  return <MainView />
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MovieApiApplication />);