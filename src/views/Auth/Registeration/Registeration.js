import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { authContext } from '../../../store/context/authContext';
import firebase from '../../../config/fbConfig'
import M from 'materialize-css'
import Button from '../../../components/Ui/Button/Button';

function Registeration() {
    const { state, dispatch } = React.useContext(authContext)
    const [isDisabled, setDisabled] = useState(false)
    const [value, setValue] = useState(false)


    return (
        <>
            <div>
                <h1>Registeration</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: '',
                        userName: '',
                        phone: ''
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
                        // CONFIRM PASSWORD
                        if (!values.confirmPassword) { errors.confirmPassword = 'Required'; }
                        else if (values.confirmPassword !== values.password) { errors.confirmPassword = "Passwords don't match."; }
                        // USER NAME
                        if (!values.userName) { errors.userName = 'Required'; }
                        // PHONE
                        if (!values.phone) { errors.phone = 'Required'; }
                        else if ((values.phone.length < 11)) {
                            errors.phone = 'Phone must be 11 number long.';
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        firebase.signin(values).then(res => {
                            if (res.message) {
                                M.toast({ html: res.message, classes: 'toast-error' });

                            } else {
                                M.toast({ html: 'Registeration Successfully', classes: 'toast-success' });
                                setDisabled(true);
                                firebase.firDB.child(`users/${res.user.uid}`).push({
                                    userName: values.userName,
                                    phone: values.phone,
                                    email: values.email,
                                })
                                return dispatch({
                                    type: "SIGNIN",
                                    payload: res
                                })

                            }
                        }).finally(res => {
                            firebase.firDB.child('users').on('value', snap => {
                                console.log(snap.val())
                            })
                        });

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
                                <label htmlFor="">User Name</label>
                                <Field name="userName">
                                    {({
                                        field, // { name, value, onChange, onBlur }
                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta,
                                    }) => (
                                            <div>
                                                <input className={meta.touched && meta.error ? 'form-control is-invalid' : 'form-control '} type="text" placeholder="User Name" {...field} />
                                                {meta.touched && meta.error && (
                                                    <div className="red-text text-darken-2">{meta.error}</div>
                                                )}
                                            </div>
                                        )}
                                </Field>
                            </div>
                            <div className="form-group col s12">
                                <label htmlFor="">Phone </label>
                                <Field name="phone">
                                    {({
                                        field, // { name, value, onChange, onBlur }
                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta,
                                    }) => (
                                            <div>
                                                <input className={meta.touched && meta.error ? 'form-control is-invalid' : 'form-control '} type="text" placeholder="Phone" {...field} />
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
                            <div className="form-group col s12">
                                <label htmlFor="">Confirm Password</label>
                                <Field name="confirmPassword">
                                    {({
                                        field, // { name, value, onChange, onBlur }
                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta,
                                    }) => (
                                            <div>
                                                <input className={meta.touched && meta.error ? 'form-control is-invalid' : 'form-control '} type="password" placeholder="Confirm Password" {...field} />
                                                {meta.touched && meta.error && (
                                                    <div className="red-text text-darken-2">{meta.error}</div>
                                                )}
                                            </div>
                                        )}
                                </Field>
                            </div>

                            <Button btn="btn btn-primary">Save</Button>

                        </Form>
                    )}
                </Formik>
            </div>
        </>

    )

}

export default Registeration;