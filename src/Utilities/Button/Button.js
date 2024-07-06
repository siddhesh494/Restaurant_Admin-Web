import React from 'react'
import './Button.css'

const Button = ({
  name = "Default",
  handleOnClick = () => {},
  size="lg",
  type="contained"
}) => {
  return (
    <div>
      <button
        className={`button-${type} font-semibold rounded-lg ${size === "lg" ? "button-lg" : size === "md" ? "button-md" : size==='s' ? "button-s" : "button-xs"}`}
        onClick={handleOnClick}
      >
        <span className='sm-info-text'>{name}</span>
      </button>
    </div>
  )
}

export default Button