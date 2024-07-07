import React, { useEffect, useState } from 'react'
import Modal from '../../UtilitiesComponents/Modal/Modal'
import { filter, findIndex, forEach, map } from 'lodash'
import Accordion from '../../UtilitiesComponents/Accordion/Accordion'
import DeleteIcon from '../../assests/PNG/delete.png'
import VegIcon from '../../assests/PNG/veg.png'
import NonVegIcon from '../../assests/PNG/non-veg.png'
import Button from '../../UtilitiesComponents/Button/Button'
import './ViewMenu.css'
import { postRequestAsync } from '../../utils/apiInstance'
import urls from '../../utils/apiUrls'


const ViewMenu = ({
  showViewModal,
  setShowViewModal,
  viewModalDetails,
  notifyError,
  notifySuccess
}) => {
  const [menuList, setMenuList] = useState([])
  const [accordionState, setAccordionState] = useState([])
  const [saveState, setSaveState] = useState(false)
  const [isSaveDisabled, setIsSaveDisabled] = useState(false)

  useEffect(() => {
    let isDisabled = false
    forEach(menuList, (cat) => {
      if(!cat.categoryName) {
        isDisabled = true
      }
      forEach(cat.foodList, (item) => {
        if(!item.foodName) {
          isDisabled = true
        }
        if(!item.price) {
          isDisabled = true
        }
      })
    })
    setIsSaveDisabled(isDisabled)
  }, [menuList])


  const handleOnClose = () => {
    setShowViewModal(false)
  }
  useEffect(() => {
    const temp = map(viewModalDetails.menu, (item) => ({...item, foodList: map(item.foodList, i => ({...i}))}))
    setMenuList([...temp] || [])
    setAccordionState(map(viewModalDetails.menu, (i) => false))
  }, [viewModalDetails])

  async function updateRestaurantDetails() {
    try {
      const updateObj = {
        restaurantName: viewModalDetails.name,
        description: viewModalDetails.description,
        location: viewModalDetails.location,
        priceFor2: viewModalDetails.priceFor2,
        menu: map(menuList, (item) => ({
          categoryName: item.categoryName,
          foodList: map(item.foodList, (i) => ({
            foodName: i.foodName,
            isVeg: i.isVeg,
            price: i.price
          }))
        }))
      }
      const response = await postRequestAsync(urls.UPDATE, {
        id: viewModalDetails.id,
        updateData: updateObj
      })

      if(response.success) {
        notifySuccess("Restaurant Updated Successfully")
      } else {
        notifyError("Error while updating restaurant")
        console.log(response)
      }
    } catch (error) {
      notifyError("Error while updating restaurant")
      console.log(error)
    }
  }
  
  const handleFoodDelete = (categoryInd, foodInd) => {
    const category = {
      categoryName: menuList[categoryInd].categoryName,
      foodList: filter(menuList[categoryInd].foodList, (item, i) => !(i === foodInd))
    }
    menuList[categoryInd] = category
    setMenuList([...menuList])
  }

  const handleCategoryDelete = (categoryInd) => {
    const temp = filter(menuList, (item, i) => !(i === categoryInd))
    setMenuList([...temp])
  }

  const addNewCategory = () => {
    setMenuList(prev => ([
      ...prev,
      {
        categoryName: "",
        foodList: []
      }
    ]))
  }

  const addNewFood = (categoryName) => {
    const ind = findIndex(menuList, {categoryName: categoryName})
    menuList[ind].foodList.push({
      foodName: "",
      isVeg: true,
      price: 0
    })
    setMenuList([...menuList])
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

  const handleOnCancel = () => {
    const temp = map(viewModalDetails.menu, (item) => ({...item, foodList: map(item.foodList, i => ({...i}))}))
    setMenuList([...temp] || [])
  }


  const ModalBody = (
      <>
      {/*body*/}
      <div className='mb-5'>

        <p>
          {viewModalDetails.description}
        </p>

        <p className='font-bold my-3'>
          {viewModalDetails.location}
        </p>

        <p className='font-semibold'>
          {viewModalDetails.priceFor2}Rs for 2 person
        </p>
      </div>

      {/* Button for save and edit */}
      <div className='flex justify-end'>
        {
          saveState ? (
            <>
            <div className='mr-4'>
              <Button
                name = {"Cancel"}
                size={"s"}
                className="mr-10"
                handleOnClick={() => {
                  setSaveState(false)
                  handleOnCancel()
                }}
              />
            </div>
            <div>
              <Button
                name = {"Save"}
                size={"s"}
                isDisabled={isSaveDisabled}
                handleOnClick={() => {
                  setSaveState(false)
                  updateRestaurantDetails()
                  // saveFnForRestDetails()
                }}
              />
            </div>
            </>
          ) : (
            <>
            <Button
              name = {menuList.length === 0 ? "Add Menu" : "Edit"}
              size={"s"}
              handleOnClick={() => {
                setSaveState(true)
              }}
            />
            </>
          )
        }
      </div>

      <div>
        {menuList.length === 0 ? (
          <div className='text-center'>
            <span className='info-text'>No Menu Added</span>
          </div>
        ) : (
          map(menuList, (category, ind) => {
            return (
              <div className='my-5' key={ind}>
              <Accordion
                isOpen={accordionState[ind]}
                title={category.categoryName || "Default Name"}
                handleOnClick={() => {
                  accordionState[ind] = !accordionState[ind]
                  setAccordionState([...accordionState])
                }}
              >
                <>
                  {
                    saveState ? 
                    <div 
                      className='flex justify-end cursor-pointer'
                      onClick={() => {
                        handleCategoryDelete(ind)
                      }}
                    >
                      <button
                        className='delete-btn'
                      >
                        Delete
                      </button>
                    </div> : null
                  }
                  {
                    saveState ? keyValue(
                      "Category Name",
                      <div>
                        <input 
                          className='px-2 py-2 border border-black rounded-md w-full'
                          value={category?.categoryName || ''}
                          onChange={(e) => {
                            menuList[ind].categoryName = e.target.value
                            setMenuList([...menuList])
                          }}
                        />
                      </div>
                    ) : null
                  }
                {
                  map(category.foodList, (foodItem, fInd) => {
                    return (
                      <div className='border border-black p-5 pt-0 my-7 rounded-lg' key={fInd}>
                        {saveState ? <div 
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
                        </div> : <div className='px-4 py-4'></div>}
                        <div className={`${saveState ? "md:flex md:justify-between" : "flex justify-between"}`}>
                          <div>
                            {/* food name */}
                            {saveState ? (
                              <input
                                placeholder='Enter Food Name'
                                value={foodItem.foodName}
                                className='border border-black py-1 rounded-md px-1'
                                onChange={(e) => {
                                  if(menuList[ind].foodList[fInd] && typeof menuList[ind].foodList[fInd] === "object") {
                                    menuList[ind].foodList[fInd].foodName = e.target.value
                                    setMenuList([...menuList])
                                  }
                                }}
                              />
                            ) : (
                              <div className='flex items-center mr-4'>
                                <img
                                  alt="veg"
                                  src={foodItem.isVeg ? VegIcon : NonVegIcon}
                                  
                                  className='mr-2 veg-nonveg-icon'
                                />
                                <span>{foodItem.foodName}</span>
                              </div>
                            )}
                            {/* veg nonveg selection */}
                            {saveState ? (
                              <div className='mt-2'>
                                <div className="flex items-center ">
                                  <input 
                                    checked={foodItem.isVeg}
                                    id={`veg-${category?.categoryName}-${fInd}`} 
                                    type="radio" 
                                    name={`veg-${category?.categoryName}-${fInd}`} 
                                    className=" text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                    onChange={() => {
                                      if(menuList[ind].foodList[fInd] && typeof menuList[ind].foodList[fInd] === "object") {
                                        menuList[ind].foodList[fInd].isVeg = true
                                        setMenuList([...menuList])
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
                                      if(menuList[ind].foodList[fInd] && typeof menuList[ind].foodList[fInd] === "object") {
                                        menuList[ind].foodList[fInd].isVeg = false
                                        setMenuList([...menuList])
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
                            ) : null}
                            
                          </div>
                          {/* price */}
                          <div>
                            {saveState ? (
                              <div className='mt-2'>
                              <input
                                type='number'
                                placeholder='Enter Price'
                                value={foodItem.price}
                                className='border border-black py-1 w-24 rounded-md px-1 mr-1'
                                onChange={(e) => {
                                  if(menuList[ind].foodList[fInd] && typeof menuList[ind].foodList[fInd] === "object") {
                                    menuList[ind].foodList[fInd].price = e.target.value
                                    setMenuList([...menuList])
                                  }
                                }}
                              />
                              <label>Rs</label>
                              </div>
                            ) : (
                              <span>{foodItem.price} Rs</span>
                            )}
                            
                          </div>
                        </div>

                      </div>
                    )
                  })
                }

                {/* add food button */}
                {saveState ? <div>
                  <Button 
                    name='Add Food'
                    size='xs'
                    handleOnClick={() => {
                      addNewFood(category?.categoryName)
                    }}
                    type='outlined'
                  />
                </div> : null}
                </>
              </Accordion>
              </div>
            )
          })
        )}
      </div>
      
      {saveState ? (
        <div className='my-5'>
          <Button
            name='Add Category'
            size='s'
            handleOnClick={addNewCategory}
            type='outlined'
          />
        </div>
      ) : null}
      
      </>      

  )

  return (
    <div>
      <Modal
        showModal={showViewModal}
        heading='View Menu'
        body={ModalBody}
        handleOnClose={handleOnClose}
      />
    </div>
  )
}

export default ViewMenu