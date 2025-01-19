import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import money_stack_image from '../../assets/money_stack.png';
import styles from './LoginPage.module.css';
import BootstrapButton from "../../components/Button.tsx"
import BootstrapInput from "../../components/Input.tsx";
import { FaEnvelope, FaLock } from "../../components/Fa-Icon.tsx";

const LoginPage: React.FC = () => {

    const initialFormFields = {
        email: "",
        password: "",
        rememberme: false,
    }

    const [formInput, setFormInput] = useState(initialFormFields);
    const [inputError, setInputError] = useState({
        email: "",
        password: "",
    });

    function validateForm() {
        const { email, password } = formInput;
        const newErrors = { email: "", password: "" };

        // Email validation
        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format.";
        }

        // Password validation
        if (!password.trim()) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);
        return !newErrors.email && !newErrors.password;
    };

    function inputChangeHandler(event: any) {
        setFormInput(prevFormState => ({
            ...prevFormState,
            [event.target.name]: event.target.value
        }))
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const { email, password, rememberme } = formInput;

        console.log("Submitted:", { email, password, rememberme });

    };

    return (
        <section className="vh-100">
            <div className={`container-fluid ${styles.hCustom}`}>
                <h1 id={styles.title}>Finance Tracking App</h1>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src={money_stack_image} className="img-fluid" alt="Image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleSubmit}>
                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <BootstrapInput id={'email_input_id'} type={'email'}
                                                name={'email'}
                                                className={'form-control form-control-lg'}
                                                placeholder={'Enter a valid email address'}
                                                onChange = {inputChangeHandler}
                                                autoComplete="on"
                                />
                                <FaEnvelope />
                                <label className="form-label" htmlFor="email_input_id">Email address</label>
                            </div>

                            {/* Password input */}
                            <div className="form-outline mb-3">
                                <BootstrapInput id={'password_input_id'} type={'password'}
                                                name={'password'}
                                                className={'form-control form-control-lg'}
                                                placeholder={'Enter password'}
                                                onChange = {inputChangeHandler}
                                                autoComplete="on"
                                />
                                <FaLock />
                                <label className="form-label" htmlFor="password_input_id">Password</label>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                {/* Checkbox */}
                                <div className="form-check mb-0">
                                    <BootstrapInput id={'rememberme_input_id'} type={'checkbox'}
                                                    name={'rememberme'}
                                                    className={'form-check-input me-2'}
                                                    onChange = {inputChangeHandler}
                                    />
                                    <label className="form-check-label" htmlFor="rememberme_input_id">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-body">Forgot password?</a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <BootstrapButton
                                    variant="primary"
                                    size="lg"
                                    onClick={() =>{}}
                                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                >
                                    Login
                                </BootstrapButton>
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Don't have an account? <Link to="/register" className="link-danger">Register</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
