import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Button from '../../../components/Ui/Button/Button';
import { authContext } from '../../../store/context/authContext';
import firebase from '../../../config/fbConfig'
import M from 'materialize-css'
import { Redirect } from 'react-router-dom';
const Login = () => {
    const { state, dispatch } = React.useContext(authContext)
    const [isDisabled, setDisabled] = useState(false)
    const [routeRedirect, SetRouteRedirect] = useState(false)
    const redirect =routeRedirect;
    console.log(routeRedirect)
    if(redirect){
        return <Redirect to="/products"/>
    }
    return (
        <div>
            <h1>Login</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validate={values => {
                    const errors = {};
                    //  EMAIL
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }

                    // PASSWORD
                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    else if ((values.password.length < 8)) {
                        errors.password = 'Password must be 8 characters long.';
                    }


                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    // console.log(state)
                    firebase.login(values.email, values.password).then(res => {
                        if (res.message) {
                            M.toast({ html: res.message, classes: 'toast-error' });

                        } else {
                            setDisabled(true);

                            M.toast({ html: 'Login Successfully', classes: 'toast-success' });
                            console.log(res)
                            SetRouteRedirect(true)

                            return dispatch({
                                type: "LOGIN",
                                payload: res.user
                            })
                        }
                    }).catch(err => {
                        console.log(err + 'err')
                    })



                }}
            >
                {({ props: FormikProps }) => (
                    <Form className="form-row white">
                        <div className="form-group col s12">
                            <label htmlFor=""> Email</label>

                            <Field name="email">
                                {({
                                    field, // { name, value, onChange, onBlur }
                                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                    meta,
                                }) => (
                                        <div>
                                            <input className={meta.touched && meta.error ? 'form-control is-invalid' : 'form-control '} type="email" placeholder="Email" {...field} />
                                            {meta.touched && meta.error && (
                                                <div className="red-text text-darken-2">{meta.error}</div>
                                            )}
                                        </div>
                                    )}
                            </Field>
                        </div>

                        <div className="form-group col s12">
                            <label htmlFor="">password</label>
                            <Field name="password">
                                {({
                                    field, // { name, value, onChange, onBlur }
                                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                    meta,
                                }) => (
                                        <div>
                                            <input className={meta.touched && meta.error ? 'form-control is-invalid' : 'form-control '} type="password" placeholder="Password" {...field} />
                                            {meta.touched && meta.error && (
                                                <div className="red-text text-darken-2">{meta.error}</div>
                                            )}
                                        </div>
                                    )}
                            </Field>
                        </div>


                        <Button isDisabled={isDisabled} btn="btn btn-primary">Save</Button>

                    </Form>
                )}
            </Formik>


        </div>

    )
}


export default Login;