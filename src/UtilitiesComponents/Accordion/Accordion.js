import React from 'react'
import './Accordion.css'

const Accordion = ({
  title = "Default Title",
  isOpen = false,
  children,
  handleOnClick = () => {}
}) => {
  return (
    <div
      className={`accordion-container`}
    >
      {/* heading */}
      <div
        className={`accordion-head`}
        onClick={handleOnClick}
      >
        <span
          className={`accordion-title-style info-text `}
        >{title}</span>
        <span
          className={`accordion-icon-style`}
        >
          {isOpen ? '\u2212': '\u002B'}
        </span>
      </div>
      
      {isOpen && (
        <div
          className={`accordion-body`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Accordion