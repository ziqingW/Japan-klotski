import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import '../node_modules/react-grid-layout/css/styles.css'
import App from './App';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(<App />);
