import React from "react";
import ReactDOM from "react-dom";
import './styles.scss';

const App = () => {
	return <div>Hello React,Webpack 4 & Babel 7!</div>;
};

// const renderJWTForm = (selector = '#root') => {
// 	return ReactDOM.render(<App />, document.querySelector(selector));
// }

ReactDOM.render(<App />, document.querySelector("#root"));