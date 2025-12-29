import { createRoot } from 'react-dom/client';
import { MainView } from './main-view/main-view';
import './index.scss';

const MovieApiApplication = () => {
  return <MainView />
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MovieApiApplication />);