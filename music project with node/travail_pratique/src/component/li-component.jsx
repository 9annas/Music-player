import React from 'react'

const LiComponent = ({ id, classe, link, text, onChangeHandler }) => (
    <li><a id={id} className={classe} href={link}>{text}</a></li>
)

export default LiComponent
