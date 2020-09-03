import React from 'react';

import classes from './Button.module.css';

const Button = (props) => (
    <button
        type="submit"
        disabled={props.isDisabled}
        className={[classes[props.btnClass], classes[props.btnType] ,props.btn].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default Button;