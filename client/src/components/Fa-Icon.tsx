import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';

const FaEnvelope = () => {
    return (
        <FontAwesomeIcon icon={faEnvelope} className={``}/>
    );
};

const FaLock = () => {
    return (
        <FontAwesomeIcon icon={faLock} />
    )
}
export { FaEnvelope, FaLock };
