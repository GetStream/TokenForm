import { Fragment, h } from 'preact';
import useJWTGenerator from './useJWTGenerator';

const App = () => {
	const [jwt, { userID, secret, handleSecretChange, handleUserIDChange, options }] = useJWTGenerator();
	return (
		<Fragment>
			<div class="header">
				<div class="inputs">
					<select id="secret" value={secret} onChange={handleSecretChange}>
						{options}
					</select>
					<input id="user_id" placeholder="User ID" value={userID} onInput={handleUserIDChange} />
				</div>
			</div>
			<div class="container">
				<pre id="jwt">
					<span id="jwt_header"></span>
					<span id="jwt_payload"></span>
					<span id="jwt_signature"></span>
				</pre>
				<p id="warning" class="show">Please enter a Stream User ID</p>
			</div>
		</Fragment>
	);
};

export default App;