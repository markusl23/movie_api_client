import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import 'bootstrap/dist/css/bootstrap.min.js';
import './index.scss';

const MovieApiApplication = () => {
  return <MainView />
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MovieApiApplication />);