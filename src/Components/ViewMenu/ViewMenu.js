import React, { useState } from 'react'
import Modal from '../../Utilities/Modal/Modal'

const ViewMenu = ({
  showViewModal,
  setShowViewModal,
}) => {


  const ModalBody = (
      <>
      {/*body*/}
      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
        I always felt like I could do anything. That’s the main
        thing people are controlled by! Thoughts- their perception
        of themselves! They're slowed down by their perception of
        themselves. If you're taught you can’t do anything, you
        won’t do anything. I was taught I could do everything.
      </p>
      {/*footer*/}
      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
        <button
          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowViewModal(false)}
        >
          Close
        </button>
        <button
          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowViewModal(false)}
        >
          Save Changes
        </button>
      </div>
      </>      

  )

  return (
    <div>
      <Modal
        showModal={showViewModal}
        heading='View Menu'
        body={ModalBody}
        handleOnClose={() => {
          setShowViewModal(false)
        }}
      />
    </div>
  )
}

export default ViewMenu