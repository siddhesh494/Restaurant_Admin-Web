import React, {useState} from 'react'
import Button from '../../Utilities/Button/Button'
import RestaurantDetails from '../../MockData/RestaurantDetails.json'
import Accordion from '../../Utilities/Accordion/Accordion'
import { map } from 'lodash'
import ViewMenu from '../ViewMenu/ViewMenu'
import AddRestaurant from '../AddRestaurant/AddRestaurant'


const HomePage = () => {

  const [restaurantDetails, setRestaurantDetails] = useState(RestaurantDetails)
  const [accordionState, setAccordionState] = useState(map(RestaurantDetails, (i) => false))
  const [saveState, setSaveState] = useState(map(RestaurantDetails, (i) => false))
  
  const [showViewModal, setShowViewModal]= useState(false)
  const [showAddModal, setShowAddModal]= useState(false)
  const [viewModalDetails, setViewModalDetails] = useState({})
  const saveFnForRestDetails = () => {

  }

  return (
    <>
    <AddRestaurant
      showAddModal={showAddModal}
      setShowAddModal={setShowAddModal}
    />
    <ViewMenu
      showViewModal={showViewModal}
      setShowViewModal={setShowViewModal}
    />

    <div className='m-10'>
      
      <div className='flex justify-end'>
        <Button
          name='Add Restaurant'
          size='md'
          handleOnClick={() => {
            setShowAddModal(true)
          }}
        />
      </div>

      <div className='my-10'>
        {map(RestaurantDetails, (item, ind) => {
          return (
            <div className='my-5' key={ind}>
              <Accordion
                isOpen={accordionState[ind]}
                title={item.name}
                handleOnClick={() => {
                  accordionState[ind] = !accordionState[ind]
                  setAccordionState([...accordionState])
                }}
              >
                <div>
                  {/* Button for save and edit */}
                  <div className='flex justify-end'>
                    {
                      saveState[ind] ? (
                        <>
                        <div className='mr-4'>
                          <Button
                            name = {"Cancel"}
                            size={"s"}
                            className="mr-10"
                            handleOnClick={() => {
                              saveState[ind] = false
                              setSaveState([...saveState])
                            }}
                          />
                        </div>
                        <div>
                          <Button
                            name = {"Save"}
                            size={"s"}
                            handleOnClick={() => {
                              saveState[ind] = false
                              setSaveState([...saveState])
                              saveFnForRestDetails()
                            }}
                          />
                        </div>
                        </>
                      ) : (
                        <>
                        <Button
                          name = {"Edit"}
                          size={"s"}
                          handleOnClick={() => {
                            saveState[ind] = true
                            setSaveState([...saveState])
                          }}
                        />
                        </>
                      )
                    }
                    
                  </div>
                  {
                    saveState[ind] ? (
                      <div className='sm-info-text my-6'>
                        <div className='mb-2'>
                          <textarea 
                            className='px-2 py-1 border border-black rounded-md w-3/4 h-36'
                            value={item.description}
                            onChange={(e) => {
                              if(restaurantDetails[ind] && typeof restaurantDetails[ind] === "object") {
                                restaurantDetails[ind].description = e.target.value
                                setRestaurantDetails([...restaurantDetails])
                              }
                            }}
                          />
                        </div>
                        <div className='my-6'>
                          <span className=''>Location: </span>
                          <input 
                            className='px-2 py-1 border border-black rounded-md'
                            value={item.location}
                            onChange={(e) => {

                              if(restaurantDetails[ind] && typeof restaurantDetails[ind] === "object") {
                                restaurantDetails[ind].location = e.target.value
                                setRestaurantDetails([...restaurantDetails])
                              }
                            }}
                            />
                        </div>
                        <div>
                          <input 
                            className='px-2 py-1 border border-black rounded-md mr-2'
                            value={item.priceFor2}
                            onChange={(e) => {
                              if(restaurantDetails[ind] && typeof restaurantDetails[ind] === "object") {
                                restaurantDetails[ind].priceFor2 = e.target.value
                                setRestaurantDetails([...restaurantDetails])
                              }
                            }}
                          />
                          <span className=''>RS for 2 person</span>
                        </div>
                      </div>
                    ) : (
                      <div className='sm-info-text my-6'>
                        <span className='sm-info-text'>{item.description}</span>
                        <br />
                        <span className='font-bold'>Location:</span> <span>{item.location}</span>
                        <br />
                        <span className='underline'>{item.priceFor2} Rs for 2 person.</span>
                      </div>
                    )
                  }
                  
                  {
                    !saveState[ind] ? (
                      <div className='my-6 sm-info-text'>
                        <span 
                          className='underline text-blue-500 cursor-pointer'
                          onClick={() => {
                            setShowViewModal(true)
                          }}  
                        >
                          View menu
                        </span>
                      </div>
                    ) : null
                  }
                  

                </div>
              </Accordion>
            </div>
          )
        })}
        
      </div>

    </div>
    </>

  )
}

export default HomePage