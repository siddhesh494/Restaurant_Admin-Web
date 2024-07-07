import React from 'react'
import './Button.css'

const Button = ({
  name = "Default",
  handleOnClick = () => {},
  size="lg",
  type="contained",
  isDisabled,
  isLoading
}) => {
  return (
    <div>
      <button
        disabled={isDisabled || isLoading}
        className={`hover:shadow-lg button-${type} font-semibold rounded-md ${size === "lg" ? "button-lg" : size === "md" ? "button-md" : size==='s' ? "button-s" : "button-xs"} ${isDisabled ? "disabled-button" : ""}`}
        onClick={handleOnClick}
      >
        <span className='sx-info-text'>{name}</span>
      </button>
    </div>
  )
}

export default Button