import React from "react";
import styles from "./RegisterPage.module.css";

import BoostrapButton from "../../components/Button.tsx";
import BootstrapInput from "../../components/Input.tsx";
import {FaEnvelope, FaUser, FaLock, FaKey} from "../../components/Fa-Icon.tsx";
//import alert from '../../utils/Alert.tsx';
import {ToastContainer} from "react-toastify";



const RegisterPage: React.FC = () => {
    return (
        // https://mdbootstrap.com/docs/standard/extended/registration/
        <section className='vh-100'>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className={`card text-black ${styles.main_card}`} >
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form className="mx-1 mx-md-4">
                                            {/*Name*/}
                                            <div className="d-flex flex-row align-items-center mb-4">

                                                <FaUser className = "fa-lg me-2 mb-4"/>
                                                <div className="form-outline flex-fill mb-0">
                                                    <BootstrapInput id="form_name" type="text"
                                                                    name="name"
                                                                    className="form-control"
                                                                    onChange={() => {}}
                                                                    autoComplete="on"
                                                    />
                                                    <label className="form-label" htmlFor="form_name">
                                                        Your Name
                                                    </label>
                                                </div>
                                            </div>
                                            {/*Email*/}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <FaEnvelope className="fa-lg me-2 mb-4"/>
                                                <div className="form-outline flex-fill mb-0">
                                                    <BootstrapInput id="form_email" type="email"
                                                                    name="email"
                                                                    className="form-control"
                                                                    onChange={() => {}}
                                                                    autoComplete="on"
                                                    />
                                                    <label className="form-label" htmlFor="form_email">
                                                        Your Email
                                                    </label>
                                                </div>
                                            </div>

                                            {/*Password*/}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <FaLock className="fa-lg me-2 mb-4"/>
                                                <div className="form-outline flex-fill mb-0">
                                                    <BootstrapInput id="form_password" type="password"
                                                                    name="password"
                                                                    className="form-control"
                                                                    onChange={() => {}}
                                                    />
                                                    <label className="form-label" htmlFor="form_password">
                                                        Password
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <FaKey className="fa-lg me-2 mb-4"/>
                                                <div className="form-outline flex-fill mb-0">
                                                    <BootstrapInput id="form_password_repeat" type="password"
                                                                    name="password_repeat"
                                                                    className="form-control"
                                                                    onChange={() => {}}
                                                    />
                                                    <label className="form-label" htmlFor="form_password_repeat">
                                                        Repeat your password
                                                    </label>
                                                </div>
                                            </div>
                                            {/*Register Button*/}
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <BoostrapButton variant="primary" size="lg" type="submit"
                                                                onClick={() => {}}
                                                >
                                                    Register
                                                </BoostrapButton>
                                            </div>

                                        </form>

                                    </div>
                                    {/*Image*/}
                                    <div
                                        className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample image"/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </section>
    );
}

export default RegisterPage;