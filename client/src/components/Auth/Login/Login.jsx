import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';

import Input from '../../shared/Input/Input.jsx';
import * as validator from '../../../utils/validators/authValidator.js';
import * as authService from '../../../services/authService.js';

import './Login.css';

function Login({ history, clickHandler }) {
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const onLoginSubmitHandler = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        setErrorEmail(validator.validEmail(email));
        setErrorPassword(validator.validPassword(password));

        if (validator.validEmail(email) === '' &&
            validator.validPassword(password) === '') {
            authService
                .login(email, password)
                .then((data) => {
                    if (data['status'] === 400) {
                        toastr.error(data['message'], 'Error');
                        return;
                    }
                    localStorage.setItem('token', data['token']);
                    localStorage.setItem('username', data['username']);
                    localStorage.setItem('isAdmin', data['isAdmin']);
                    clickHandler();
                    history.push('/');
                    toastr.success(data['message'], 'Success');
                });
        }
    }

    return (
        <div className="login-wrapper">
            <div className="container">
                <h1 className="text-center custom-font">Sign In</h1>
                <hr />
                <div className="row">
                    <div className="col-lg-10">
                        <form className="mt-2" onSubmit={onLoginSubmitHandler}>
                            <Input
                                type='email'
                                name='email'
                                label='Email'
                                error={errorEmail} />

                            <Input
                                type='password'
                                name='password'
                                label='Password'
                                error={errorPassword} />

                            <button className="btn btn-dark" type="submit">Sign In</button>
                        </form>
                    </div>
                </div >
            </div >
        </div >
    );
}

export default withRouter(Login);