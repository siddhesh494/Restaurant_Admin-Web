import React, { useEffect, useState } from 'react'
import Modal from '../../UtilitiesComponents/Modal/Modal'
import Button from '../../UtilitiesComponents/Button/Button'
import Accordion from '../../UtilitiesComponents/Accordion/Accordion'
import { filter, findIndex, forEach, isEmpty, map } from 'lodash'
import { postRequestAsync } from '../../utils/apiInstance'
import urls from '../../utils/apiUrls'
import DeleteIcon from '../../assests/PNG/delete.png'

const AddRestaurant = ({
  showAddModal, 
  setShowAddModal,
  getAllRestaurantDetails
}) => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [priceFor2, setPriceFor2] = useState('')

  const [menuDetails, setMenuDetails] = useState([])
  const [isSaveDisabled, setIsSaveDisabled] = useState(false)

  useEffect(() => {
    let isDisabled = false
    if(!(name && description && location && priceFor2)) {
      isDisabled = true
    }


    forEach(menuDetails, (item) => {
      if(!item.categoryName) {
        isDisabled = true
      }
      if(isEmpty(item.food)) {
        isDisabled = true
      }
      forEach(item.food, (f) => {
        if(!f.foodName) {
          isDisabled = true
        }
      })
    })

    setIsSaveDisabled(isDisabled)
  }, [name, description, location, priceFor2, menuDetails])

  const handleOnClose = () => {
    setShowAddModal(false)
    setMenuDetails([])
    setIsSaveDisabled(false)
    setName('')
    setDescription('')
    setLocation('')
    setPriceFor2('')
    getAllRestaurantDetails()
  }

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

  async function createNewRestaurant() {
    try {
      const createObj = {
        restaurantName: name,
        description: description,
        location: location,
        priceFor2: priceFor2,
      }
      if(menuDetails && !isEmpty(menuDetails)) {
        createObj.menu = map(menuDetails, (item) => {
          return {
            categoryName: item.categoryName,
            foodList: map(item.food, (i) => ({
              foodName: i.foodName,
              isVeg: i.isVeg,
              price: i.price
            }))
          }
        })
      }
      const response = await postRequestAsync(urls.CREATE, createObj)
      if(response.success) {
        handleOnClose()
      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFoodDelete = (categoryInd, foodInd) => {
    const category = {
      categoryName: menuDetails[categoryInd].categoryName,
      isOpen: menuDetails[categoryInd].isOpen,
      food: filter(menuDetails[categoryInd].food, (item, i) => !(i === foodInd))
    }
    menuDetails[categoryInd] = category
    setMenuDetails([...menuDetails])
  }

  const handleCategoryDelete = (categoryInd) => {
    const temp = filter(menuDetails, (item, i) => !(i === categoryInd))
    setMenuDetails([...temp])
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
                  <div 
                    className='flex justify-end cursor-pointer'
                    onClick={() => {
                      handleCategoryDelete(ind)
                    }}
                  >
                    <div className='border border-black px-4 py-1 rounded-full bg-white'>
                      <img
                        src={DeleteIcon}
                        alt='delete-icon'
                        width="20"
                      />
                    </div>
                  </div>
                  
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
                      <div className='border border-black p-5 pt-0 my-7 rounded-lg' key={fInd}>
                        <div 
                          className='flex justify-end cursor-pointer'
                          onClick={() => {
                            handleFoodDelete(ind, fInd)
                          }}
                        >
                          <div 
                            className='border border-black px-4 py-1 rounded-full bg-white'
                            style={{
                              top: "-14px",
                              right: "-21px",
                              position: "relative"
                            }}
                          >
                            <img
                              src={DeleteIcon}
                              alt='delete-icon'
                              width="20"
                            />
                          </div>
                        </div>
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
                                  name={`veg-${category?.categoryName}-${fInd}`} 
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
                                  name={`nonveg-${category?.categoryName}-${fInd}`} 
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
          isDisabled={isSaveDisabled}
          handleOnClick={() => {
            createNewRestaurant()
          }}
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
        heading='Add Restaurant'
        body={ModalBody}
        handleOnClose={handleOnClose}
      />
    </div>
  )
}

export default AddRestaurant