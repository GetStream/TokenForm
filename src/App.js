import { Fragment, h } from 'preact';
import useJWTGenerator from './useJWTGenerator';
import useToggleExpirationForm from './useToggleExpirationForm';
import { useState } from 'preact/hooks';

const renderJWT = (jwt, userID) => {
	if (jwt && userID) {
		return (
			<pre id="jwt">{jwt.split('.').map((item, i, a) => <span>{item}{i < a.length - 1  ? '.': ''}</span>)}</pre>
		)
	} else {
		return <p id="warning" class="show">Please enter a Stream User ID</p>
	}
} 

const App = ({container}) => {
	const [jwt, { userID, secret, exp, handleExpirationChange, handleSecretChange, handleUserIDChange, options }] = useJWTGenerator(container);
	const [expirationForm, {toggleExpirationForm}] = useToggleExpirationForm();

	const toggle = (e) => {
		toggleExpirationForm(e)
		handleExpirationChange({target: { value: 0 }})
	}
	return (
		<Fragment>
			<div class="header">
				<div class="inputs">
					<input id="secret" value={secret} placeholder="Your secret" onInput={handleSecretChange} />
					<input id="user_id" placeholder="User ID" value={userID} onInput={handleUserIDChange} />
				</div>
			</div>
			<div class="container">
				{renderJWT(jwt, userID)}
			</div>
			<div class="footer">
				<div class="expiration">
					<input type="checkbox" id="expiration-toggle" name="expiration-toggle" onChange={toggle} />
					<label for="expiration-toggle">
						Set Expiration?
					</label>
					{expirationForm ? <div className="expiration-input"><input type="number" value={exp.input} id="expiration" name="expiration" onInput={handleExpirationChange}/> <label>minutes</label></div> : null}
				</div>
			</div>
		</Fragment>
	);
};

export default App;