import { createRoot } from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import { MainView } from './components/main-view/main-view';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const MovieApiApplication = () => {
  return (
    <Container style={{ border: "1px solid red"}}>
      <MainView />
    </Container>
  )
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MovieApiApplication />);