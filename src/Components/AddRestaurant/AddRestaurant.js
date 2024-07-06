import React, { useState } from 'react'
import Modal from '../../Utilities/Modal/Modal'
import Button from '../../Utilities/Button/Button'
import Accordion from '../../Utilities/Accordion/Accordion'
import { findIndex, map } from 'lodash'
import Toggle from '../../Utilities/Toggle/Toggle'

const AddRestaurant = ({
  showAddModal, 
  setShowAddModal
}) => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [priceFor2, setPriceFor2] = useState('')

  const [menuDetails, setMenuDetails] = useState([])

  const keyValue = (key, value) => {
    return (
      <div className='flex items-center my-3'>
        <div className='w-32'>
          <span className='sm-info-text'>{key}: </span>
        </div>
        <div className='w-full'>
          {value}
        </div>
      </div>
    )
  }

  const addNewCategory = () => {
    setMenuDetails(prev => ([
      ...prev,
      {
        categoryName: "",
        isOpen: true,
        food: []
      }
    ]))
  }

  const addNewFood = (categoryName) => {
    const ind = findIndex(menuDetails, {categoryName: categoryName})
    menuDetails[ind].food.push({
      foodName: "",
      isVeg: true,
      price: 0
    })
    setMenuDetails([...menuDetails])
  }

  const ModalBody = (
    <div>

      <div className='my-5'>
        {
          keyValue(
            "Restaurant Name",
            <div>
              <input 
                className='px-2 py-2 border border-black rounded-md w-full'
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </div>
          )
        }
        {
          keyValue(
            "Description",
            <div>
              <textarea 
                className='px-2 py-1 border border-black rounded-md w-full h-32'
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
            </div>
          )
        }
        {
          keyValue(
            "Location",
            <div>
              <input 
                className='px-2 py-2 border border-black rounded-md w-full'
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value)
                }}
              />
            </div>
          )
        }
        {
          keyValue(
            "Price for 2",
            <div>
              <input 
                className='px-2 py-2 border border-black rounded-md w-full'
                value={priceFor2}
                onChange={(e) => {
                  setPriceFor2(e.target.value)
                }}
              />
            </div>
          )
        }
      </div>
      
      

      {
        map(menuDetails, ( category, ind) => {
          return (
            <div className='my-3' key={ind}>
              <Accordion
                isOpen={category.isOpen}
                title={category?.categoryName || "Category Name"}
                handleOnClick={() => {
                  menuDetails[ind].isOpen = !category.isOpen
                  setMenuDetails([...menuDetails])
                }}
              >
                <div>
                  {
                    keyValue(
                      "Category Name",
                      <div>
                        <input 
                          className='px-2 py-2 border border-black rounded-md w-full'
                          value={category?.categoryName || ''}
                          onChange={(e) => {
                            menuDetails[ind].categoryName = e.target.value
                            setMenuDetails([...menuDetails])
                          }}
                        />
                      </div>
                    )
                  }

                  {map(category.food, (foodItem, fInd) => {
                    return (
                      <div className='border border-black p-5 my-3 rounded-lg' key={fInd}>
                        <div className=' flex justify-between'>
                          <div>
                            <input
                              placeholder='Enter Food Name'
                              value={foodItem.foodName}
                              className='border border-black py-1 rounded-md px-1'
                              onChange={(e) => {
                                if(menuDetails[ind].food[fInd] && typeof menuDetails[ind].food[fInd] === "object") {
                                  menuDetails[ind].food[fInd].foodName = e.target.value
                                  setMenuDetails([...menuDetails])
                                }
                              }}
                            />
                            <div className='mt-2'>
                              <div className="flex items-center ">
                                <input 
                                  checked={foodItem.isVeg}
                                  id={`veg-${category?.categoryName}-${fInd}`} 
                                  type="radio" 
                                  name="default-radio" 
                                  className=" text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                  onChange={() => {
                                    if(menuDetails[ind].food[fInd] && typeof menuDetails[ind].food[fInd] === "object") {
                                      menuDetails[ind].food[fInd].isVeg = true
                                      setMenuDetails([...menuDetails])
                                    }
                                  }}
                                />
                                <label 
                                  htmlFor={`veg-${category?.categoryName}-${fInd}`} 
                                  className="ms-2 text-sm font-medium "
                                >
                                  Veg
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input 
                                  checked={!foodItem.isVeg}
                                  id={`nonveg-${category?.categoryName}-${fInd}`} 
                                  type="radio" 
                                  name="default-radio" 
                                  className=" text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                  onChange={() => {
                                    if(menuDetails[ind].food[fInd] && typeof menuDetails[ind].food[fInd] === "object") {
                                      menuDetails[ind].food[fInd].isVeg = false
                                      setMenuDetails([...menuDetails])
                                    }
                                  }}
                                />
                                <label 
                                  htmlFor={`nonveg-${category?.categoryName}-${fInd}`}
                                  className="ms-2 text-sm font-medium "
                                >
                                  Non-veg
                                </label>
                              </div>
                            </div>
                          </div>
                          <div>
                            <input
                              type='number'
                              placeholder='Enter Price'
                              value={foodItem.price}
                              className='border border-black py-1 w-24 rounded-md px-1'
                              onChange={(e) => {
                                if(menuDetails[ind].food[fInd] && typeof menuDetails[ind].food[fInd] === "object") {
                                  menuDetails[ind].food[fInd].price = e.target.value
                                  setMenuDetails([...menuDetails])
                                }
                              }}
                            />
                          </div>
                        </div>

                      </div>
                    )
                  })}

                  <div>
                    <Button 
                      name='Add Food'
                      size='xs'
                      handleOnClick={() => {
                        addNewFood(category?.categoryName)
                      }}
                      type='outlined'
                    />
                  </div>
                </div>
              </Accordion>
            </div>
          )
        })
      }
      <div className='my-5'>
        <Button
          name='Add Category'
          size='s'
          handleOnClick={addNewCategory}
          type='outlined'
        />
      </div>


      <hr/>

      <div className='flex justify-end my-5'>
        <Button
          name='Save'
          size='s'
        />
      </div>
    </div>
      
  )
  return (
    <div
      className='max-h-[90%]'
    >
      <Modal
        showModal={showAddModal}
        heading='View Menu'
        body={ModalBody}
        handleOnClose={() => {
          setShowAddModal(false)
        }}
      />
    </div>
  )
}

export default AddRestaurant