import { render, h } from 'preact';
import './styles.scss';
import App from './App';

let root;
function init() {
	root = render(<App container={document.querySelector("#stream_jwtform")} />, document.querySelector("#stream_jwtform"));
}
init();

// example: Re-render on Webpack HMR update:
if (module.hot) module.hot.accept('./App', init);