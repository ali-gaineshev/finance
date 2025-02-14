// react
import React, {useState, useRef, useEffect} from "react";
// auth
import { useAuth } from "../../hooks/useAuth.tsx";
import {Link, useNavigate, useLocation} from "react-router-dom";
// helper funcitons
import {validateForm} from "../../utils/helpers.ts";
// hooks
import {globalApiClient} from "../../api/ApiClient.ts";
// enums
import HttpStatusCode from "../../interfaces/HttpStatusCode.ts";
import ServerUrl from "../../interfaces/ServerUrl.ts";
// images
import money_stack_image from "../../assets/money_stack.png";
//styles
import styles from "./LoginPage.module.css";
//components
import BootstrapButton from "../../components/Button.tsx";
import BootstrapInput from "../../components/Input.tsx";
import {FaEnvelope, FaLock} from "../../components/Fa-Icon.tsx";
// alert
import alert from '../../components/ui/Alert.tsx';
import {ToastContainer} from "react-toastify";
import {LoginResponse} from "../../interfaces/Response.ts";
import {AxiosResponse} from "axios";


const LoginPage: React.FC = () => {
    const apiClient = globalApiClient;

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/home';

    const { setAuth } = useAuth(); // set auth state if logged in

    const userRef = useRef<HTMLInputElement>(null);

    const initialErrMsg = {
        emailErrMsg: "",
        passwordErrMsg: "",
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errMsg, setErrMsg] = useState(initialErrMsg);

    function clearInputs(){
        setEmail('');
        setPassword('');
    }

    useEffect(() => {
        // @ts-ignore
        userRef.current.focus();
    }, [])

    // clear error if user types in input
    useEffect(() => {
        setErrMsg((prev) => ({ ...prev, emailErrMsg: "" })); // Clear only email error
    }, [email]);

    useEffect(() => {
        setErrMsg((prev) => ({ ...prev, passwordErrMsg: "" })); // Clear only password error
    }, [password]);


    const handleSubmit =  async (event: React.FormEvent) => {
        event.preventDefault();
        //form validation
        const newErrors: {email: string, password: string} = validateForm(email, password);

        if (newErrors.email || newErrors.password) {
            //set error
            setErrMsg({
               "emailErrMsg": newErrors.email,
               "passwordErrMsg": "Invalid password.",
            });
            clearInputs();
            return;
        }

        // fetch data
        try{
            const response: AxiosResponse = await apiClient.post(ServerUrl.LOGIN_API, {email, password})
            const status_code: number = response.status;
            const res: LoginResponse = response.data;

            // verification error
            if(status_code === HttpStatusCode.OK && !res.success) {

                alert(res.message, 'error')
            }

            if(status_code === HttpStatusCode.OK && res.success) {
                // valid login
                const accessToken = res.token;

                alert(res.message, 'success')

                setTimeout(() => {
                    setAuth({
                        'token' : accessToken,
                        'userState' : res.userState
                    })
                    // navigate(from, {replace: true});
                    navigate(from);
                }, 1000); // Delay navigation by 1 seconds


            }
        }catch (e: any) {
            let message = e.response?.message;
            if(e.status === HttpStatusCode.INTERNAL_SERVER_ERROR) {
                message = "Server is down. Please try again later"
            }
            alert(message, 'error')
        }finally {
            clearInputs();
        }



        // apiClient.post('/user_api/login', { email, password })
        //     .then((res) => {
        //         if (res.status === HttpStatusCode.BAD_REQUEST) {
        //
        //             setInputError({
        //                 email: res.data.message,
        //                 password: "",
        //             });
        //             return;
        //         }
        //
        //         if(res.status === HttpStatusCode.OK) {
        //             // valid
        //             alert(res.data.message, "success");
        //             setTimeout(() => {
        //                 navigate('/home');
        //             }, 1000); // Delay navigation by 1 seconds
        //         }
        //     }).catch((error) => {
        //
        //     console.error("Login error:", error);
        //     alert(error.response.data.message, "error");
        // });
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
                                    className={`form-control form-control-lg ${
                                        email ? "is-invalid" : ""
                                    }`}
                                    autoComplete="on"
                                    placeholder="Enter a valid email address"
                                    onChange={
                                        (e) => setEmail(e.target.value)
                                    }
                                    value={email}
                                    ref={userRef}
                                    required
                                />
                                <FaEnvelope/>
                                <label className="form-label" htmlFor="email_input_id">
                                    Email address
                                </label>
                                {errMsg.emailErrMsg && (
                                    <div className="invalid-feedback">{email}</div>
                                )}
                            </div>

                            {/* Password input */}
                            <div className="form-outline mb-3">
                                <BootstrapInput
                                    id="password_input_id"
                                    type="password"
                                    className={`form-control form-control-lg ${
                                        email ? "is-invalid" : ""
                                    }`}
                                    autoComplete="off"
                                    placeholder="Enter a valid password"
                                    onChange={
                                        (e) => setPassword(e.target.value)
                                    }
                                    value={password}
                                    required
                                />
                                <FaLock/>
                                <label className="form-label" htmlFor="password_input_id">
                                    Password
                                </label>
                                {errMsg.passwordErrMsg && (
                                    <div className="invalid-feedback">{password}</div>
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
                                        onChange={() => setRememberMe(!rememberMe)}
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
                                    style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}
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
};

export default LoginPage;
