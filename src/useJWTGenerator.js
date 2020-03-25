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
export default () => {
	const [jwt, setJWT] = useState('');
	const [userID, setUserID] = useState('')
	const [secret, setSecret] = useState('');
	const [apps, setApps] = useState([]);

	const options = useMemo(() => apps.map(({ name, secret }) => <option value={secret}>{name}</option>), [apps])

	const handleUserIDChange = useCallback(({ target: { value } }) => {
		setUserID(value);
	}, []);

	const handleSecretChange = useCallback(({ target: { value } }) => {
		setSecret(value);
	}, []);

	useEffect(() => {
		const params = queryString.parse(location.search);
		setApps(Object.entries(params).map(([name, secret]) => ({ name, secret })));
	}, []);

	useEffect(() => {
		const stringifiedHeader = UTF8.parse(JSON.stringify(header));
		const header = base64url(stringifiedHeader);

		const stringifiedData = UTF8.parse(JSON.stringify({ user_id: userID }));
		const data = base64url(stringifiedData);

		let signature = header + "." + data;
		signature = HMACSHA256(signature, secret);
		signature = base64url(signature);

		return setJWT(`${header}.${data}.${signature}`);
	}, [secret, userID])

	return [jwt, { userID, secret, options, handleUserIDChange, handleSecretChange }]
};