import { Fragment, h } from 'preact';
import useJWTGenerator from './useJWTGenerator';

const renderJWT = (jwt, userID) => jwt && userID ? <pre id="jwt"><span>{jwt}</span></pre> : <p id="warning" class="show">Please enter a Stream User ID</p>;

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
				{renderJWT(jwt, userID)}
			</div>
		</Fragment>
	);
};

export default App;