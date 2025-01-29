import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope, faKey, faLock, faUser} from '@fortawesome/free-solid-svg-icons';

type FaUserProps = {
    className?: string;
};

export const FaEnvelope: React.FC<FaUserProps> = ({ className = "" }) => {
    return <FontAwesomeIcon icon={faEnvelope} className={className} />;
};

export const FaLock: React.FC<FaUserProps> = ({ className = "" }) => {
    return <FontAwesomeIcon icon={faLock} className={className} />;
}

export const FaUser: React.FC<FaUserProps> = ({ className = "" }) => {
    return <FontAwesomeIcon icon={faUser} className={className} />;
}

export const FaKey: React.FC<FaUserProps> = ({ className = "" }) => {
    return <FontAwesomeIcon icon={faKey} className={className} />;
}