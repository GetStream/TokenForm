import { useState } from 'preact/hooks';
import useJWTGenerator from './useToggleExpirationForm';

export default () => {
    const [expirationform, setExpirationForm] = useState(false);

    const toggleExpirationForm = (e) => {
        if(e.target.checked) {
            setExpirationForm(true);
        } else {
            setExpirationForm(false)
        }
    }

    return [expirationform, {toggleExpirationForm}]
}