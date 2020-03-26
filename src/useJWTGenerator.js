import { h } from 'preact';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import queryString from 'query-string';
import Base64 from 'crypto-js/enc-base64';
import UTF8 from 'crypto-js/enc-utf8';
import HMACSHA256 from 'crypto-js/hmac-sha512';

const base64url = (source) => {
	let encodedSource = Base64.stringify(source);

	// Remove padding equal characters
	encodedSource = encodedSource.replace(/=+$/, '');

	// Replace characters according to base64url specifications
	encodedSource = encodedSource.replace(/\+/g, '-');
	encodedSource = encodedSource.replace(/\//g, '_');

	return encodedSource;
}
export default (container) => {
	const [jwt, setJWT] = useState('');
	const [userID, setUserID] = useState((container && container.dataset && container.dataset.secret != null) ? container.dataset.initialUserId : "User ID")
	const [secret, setSecret] = useState((container && container.dataset && container.dataset.secret != null) ? container.dataset.secret : "Your Api Key");
	const [exp, setExp] = useState({input: 0, date: 0});

	// onChange Listeners
	const handleUserIDChange = useCallback(({ target: { value } }) => {
		setUserID(value);
	}, []);

	const handleSecretChange = useCallback(({ target: { value } }) => {
		setSecret(value);
	}, []);

	const handleExpirationChange = useCallback(({target: {value}}) => {
		
		const date = Math.floor(new Date().getTime() / 1000)
		const newDate = date + value * 60;
		setExp({input: value, date: newDate})
	}, [])

	// Generate JWT on each change of the secret, or the userID
	useEffect(() => {
		const stringifiedHeader = UTF8.parse(JSON.stringify(header));
		const header = base64url(stringifiedHeader);

		const stringifiedData = UTF8.parse(JSON.stringify({ 
			user_id: userID, 
			exp: exp.input !== 0 ? exp.date : undefined 
		}));
		const data = base64url(stringifiedData);

		let signature = header + "." + data;
		signature = HMACSHA256(signature, secret);
		signature = base64url(signature);

		return setJWT(`${header}.${data}.${signature}`);
	}, [secret, userID, exp])

	return [jwt, { userID, secret, exp, setExp, handleExpirationChange, handleUserIDChange, handleSecretChange }]
};