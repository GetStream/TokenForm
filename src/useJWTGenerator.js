import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import Base64 from 'crypto-js/enc-base64';
import UTF8 from 'crypto-js/enc-utf8';
import HMACSHA256 from 'crypto-js/hmac-sha256';

const base64UrlEncode = (source) => {
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
	const [userID, setUserID] = useState((container && container.payloadset && container.dataset.secret != null) ? container.dataset.initialUserId : "User ID")
	const [secret, setSecret] = useState((container && container.dataset && container.dataset.secret != null) ? container.dataset.secret : "Your Api Key");
	const [exp, setExp] = useState({ input: 0, date: 0 });

	// onChange Listeners
	const handleUserIDChange = useCallback(({ target: { value } }) => {
		setUserID(value);
	}, []);

	const handleSecretChange = useCallback(({ target: { value } }) => {
		setSecret(value);
	}, []);

	const handleExpirationChange = useCallback(({ target: { value } }) => {

		const date = Math.floor(new Date().getTime() / 1000)
		const newDate = date + value * 60;
		setExp({ input: value, date: newDate })
	}, [])

	// Generate JWT on each change of the secret, or the userID
	useEffect(() => {
		let header = UTF8.parse(JSON.stringify({
			"alg": "HS256",
			"typ": "JWT"
		}));
		header = base64UrlEncode(header);

		let payload = UTF8.parse(JSON.stringify({
			user_id: userID,
			exp: exp.input !== 0 ? exp.date : undefined
		}));
		payload = base64UrlEncode(payload);

		const signature = HMACSHA256(`${header}.${payload}`, secret);

		return setJWT(`${header}.${payload}.${base64UrlEncode(signature)}`);
	}, [secret, userID, exp])

	return [jwt, { userID, secret, exp, setExp, handleExpirationChange, handleUserIDChange, handleSecretChange }]
};