import React from 'react';
import Style from './Button.module.css';


export const Button = ({ onClick }) => (
    <button type='button' className={Style.Button} onClick={() => onClick()}>Load more</button>
);