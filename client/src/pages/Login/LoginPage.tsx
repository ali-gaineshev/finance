import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import money_stack_image from "../../assets/money_stack.png";
import styles from "./LoginPage.module.css";
import BootstrapButton from "../../components/Button.tsx";
import BootstrapInput from "../../components/Input.tsx";
import { FaEnvelope, FaLock } from "../../components/Fa-Icon.tsx";
import { validateForm } from "../../utils/helpers.ts";
import {usePublicApiClient} from "../../hooks/ApiClient.ts";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Htpp_code from "../../utils/HttpStatusCode.ts";


const apiClient = usePublicApiClient();

const LoginPage: React.FC = () => {
    const signIn = useSignIn();
    const navigate = useNavigate();

    const initialFormFields = {
        email: "",
        password: "",
        rememberme: false,
    };

    const [formInput, setFormInput] = useState(initialFormFields);
    const [inputError, setInputError] = useState({
        email: "",
        password: "",
    });


    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormInput((prevFormState) => ({
            ...prevFormState,
            [name]: value,
        }));

        // Clear the error for the field being updated
        setInputError((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const { email, password } = formInput;
        const newErrors = validateForm(email, password);

        if (newErrors.email || newErrors.password) {
            setInputError(newErrors);
            return;
        }

        apiClient.post('/user_api/login', { email, password })
            .then((res) => {
                if (res.status === Htpp_code.BAD_REQUEST) {

                    setInputError({
                        email: res.data.message,
                        password: "",
                    });
                    return;
                }

                if(res.status === Htpp_code.OK) {
                    console.log(res);
                    console.log(res.headers);
                    console.log(res.data)
                    // valid
                    if( signIn({
                        auth: {
                            token: res.data.token, // access token
                            type: 'Bearer'
                        },
                        refresh: res.data.refresh,  // refresh token
                        userState: res.data.userState, // user information
                    })){
                        navigate('/home');
                    }
                }
            }).catch((error) => {

            console.error("Login error:", error);
        });
    };

    return (
        <section className="vh-100">
            <div className={`container-fluid ${styles.hCustom}`}>
                <h1 id={styles.title}>Finance Tracking App</h1>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img
                            src={money_stack_image}
                            className="img-fluid"
                            alt="Money Stack"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleSubmit}>
                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <BootstrapInput
                                    id="email_input_id"
                                    type="email"
                                    name="email"
                                    className={`form-control form-control-lg ${
                                        inputError.email ? "is-invalid" : ""
                                    }`}
                                    placeholder="Enter a valid email address"
                                    onChange={inputChangeHandler}
                                    autoComplete="on"
                                />
                                <FaEnvelope />
                                <label className="form-label" htmlFor="email_input_id">
                                    Email address
                                </label>
                                {inputError.email && (
                                    <div className="invalid-feedback">{inputError.email}</div>
                                )}
                            </div>

                            {/* Password input */}
                            <div className="form-outline mb-3">
                                <BootstrapInput
                                    id="password_input_id"
                                    type="password"
                                    name="password"
                                    className={`form-control form-control-lg ${
                                        inputError.password ? "is-invalid" : ""
                                    }`}
                                    placeholder="Enter password"
                                    onChange={inputChangeHandler}
                                    autoComplete="on"
                                />
                                <FaLock />
                                <label className="form-label" htmlFor="password_input_id">
                                    Password
                                </label>
                                {inputError.password && (
                                    <div className="invalid-feedback">{inputError.password}</div>
                                )}
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                {/* Checkbox */}
                                <div className="form-check mb-0">
                                    <BootstrapInput
                                        id="rememberme_input_id"
                                        type="checkbox"
                                        name="rememberme"
                                        className="form-check-input me-2"
                                        onChange={inputChangeHandler}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="rememberme_input_id"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-body">
                                    Forgot password?
                                </a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <BootstrapButton
                                    variant="primary"
                                    size="lg"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                >
                                    Login
                                </BootstrapButton>
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Don't have an account?{" "}
                                    <Link to="/register" className="link-danger">
                                        Register
                                    </Link>
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
