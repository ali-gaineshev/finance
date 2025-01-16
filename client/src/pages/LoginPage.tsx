import React from 'react';
import { Link } from 'react-router-dom';
import money_stack_image from '../assets/money_stack.png';
import styles from './css/LoginPage.module.css';

const LoginPage: React.FC = () => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Form submitted!");
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
                                <input
                                    type="email"
                                    id="email_input"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                />
                                <label className="form-label" htmlFor="email_input">Email address</label>
                            </div>

                            {/* Password input */}
                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    id="password_input"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                />
                                <label className="form-label" htmlFor="password_input">Password</label>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                {/* Checkbox */}
                                <div className="form-check mb-0">
                                    <input
                                        className="form-check-input me-2"
                                        type="checkbox"
                                        id="rememberme_input"
                                    />
                                    <label className="form-check-label" htmlFor="rememberme_input">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-body">Forgot password?</a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                                    Login
                                </button>
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
