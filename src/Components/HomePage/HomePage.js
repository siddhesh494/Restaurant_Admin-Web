import React, {useEffect, useState} from 'react'
import Button from '../../UtilitiesComponents/Button/Button'
import Accordion from '../../UtilitiesComponents/Accordion/Accordion'
import { filter, find, findIndex, map } from 'lodash'
import ViewMenu from '../ViewMenu/ViewMenu'
import AddRestaurant from '../AddRestaurant/AddRestaurant'
import { postRequestAsync } from '../../utils/apiInstance'
import urls from '../../utils/apiUrls'


const HomePage = () => {
  const [originalRestaurantDetails, setOriginalRestaurantDetails] = useState([])
  const [restaurantDetails, setRestaurantDetails] = useState([])
  const [accordionState, setAccordionState] = useState([])
  const [saveState, setSaveState] = useState([])
  
  const [showViewModal, setShowViewModal]= useState(false)
  const [showAddModal, setShowAddModal]= useState(false)
  const [viewModalDetails, setViewModalDetails] = useState({})

  async function getAllRestaurantDetails() {
    try {
      const response = await postRequestAsync(urls.GET, {})
      if(response.success) {
        const temp = map(response.data, (item) => {
          return {
            id: item._id,
            name: item.restaurantName,
            description: item.description,
            location: item.location,
            priceFor2: item.priceFor2,
            menu: item.menu || []
          }
        })
        setRestaurantDetails([...temp])
        setOriginalRestaurantDetails(response.data)
        setAccordionState(map(temp, (i) => false))
        setSaveState(map(temp, (i) => false))
      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  async function updateRestaurantDetails(id) {
    try {
      const currData = find(restaurantDetails, {id: id})
      if(!currData) {
        console.log("no data found to update")
        return
      }
      const updateObj = {
        id: id,
        updateData: {
          restaurantName: currData.name,
          description: currData.description,
          location: currData.location,
          priceFor2: currData.priceFor2
        }
      }
      const response = postRequestAsync(urls.UPDATE,updateObj)
      if(response.success) {

      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteRestaurantDetails(id) {
    try {
      const updateObj = {
        id: id
      }
      const response = await postRequestAsync(urls.DELETE, updateObj)
      if(response.success) {
        const temp = filter(restaurantDetails, (i) => !(i.id === id))
        setRestaurantDetails([...temp])
      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllRestaurantDetails()
  }, [])

  const onCancelClick = () => {
    const temp = map(originalRestaurantDetails, (item) => {
      return {
        id: item._id,
        name: item.restaurantName,
        description: item.description,
        location: item.location,
        priceFor2: item.priceFor2,
        menu: item.menu || []
      }
    })
    setRestaurantDetails([...temp])
  }

  return (
    <>
    <AddRestaurant
      showAddModal={showAddModal}
      setShowAddModal={setShowAddModal}
      getAllRestaurantDetails={getAllRestaurantDetails}
    />
    <ViewMenu
      showViewModal={showViewModal}
      setShowViewModal={setShowViewModal}
      viewModalDetails={viewModalDetails}
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
        {map(restaurantDetails, (item, ind) => {
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
                              onCancelClick()
                            }}
                          />
                        </div>
                        <div className='mr-4'>
                        <button
                          className='delete-btn'
                          onClick={() => {
                            deleteRestaurantDetails(item.id)
                          }}
                        >
                          Delete
                        </button>
                        </div>
                        <div>
                          <Button
                            name = {"Save"}
                            size={"s"}
                            handleOnClick={() => {
                              saveState[ind] = false
                              setSaveState([...saveState])
                              updateRestaurantDetails(item.id)
                              // saveFnForRestDetails()
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
                            setViewModalDetails({...restaurantDetails[ind]})
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