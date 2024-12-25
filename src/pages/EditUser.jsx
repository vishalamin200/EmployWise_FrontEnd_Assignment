import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import backIcon from '../assets/Icons/back-icon.svg';
import { editUserDetails, toggleEdit } from "../redux-toolkit/UserSlice";

const EditUser = () => {

  const { isEditing, editUser } = useSelector((state) => state?.User)
  const [userInfo, setUserInfo] = useState({ firstName: editUser?.first_name, lastName: editUser?.last_name, email: editUser?.email })

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo, [name]: value
    })
  }

  const handleEditButton = (e) => {
    e.preventDefault();
    dispatch(toggleEdit())
    setUserInfo({ firstName: editUser?.first_name, lastName: editUser?.last_name, email: editUser?.email })
  }

  const handleBackButton = () => {
    navigate(-1)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    // validations
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    if (!emailRegex.test(userInfo?.email)) {
      toast.error('Enter Valid Email')
      return
    }

    if (!userInfo?.firstName) {
      toast.error("First Name Can't Be Empty")
      return
    }

    if (!userInfo?.lastName) {
      toast.error("Last Name Can't Be Empty")
      return
    }

    const data = { id: editUser?.id, first_name: userInfo?.firstName, last_name: userInfo?.lastName, email: userInfo?.email, avatar: editUser?.avatar }

    await dispatch(editUserDetails(data))

    dispatch(toggleEdit())
    navigate(-1)
  }

  return (
    <div>

      <button id="back-button" onClick={handleBackButton} className="absolute left-5 top-5">
        <img src={backIcon} alt="back-icon" className="h-10 w-10 " />
      </button>

      <form noValidate onSubmit={handleSubmit} className={`flex   w-[100%] flex-col items-center justify-center  bg-gray-200 pt-16 text-white md:pt-12 lg:flex lg:h-screen lg:flex-row lg:pt-0  `}>

        <div className=" relative flex h-96 w-full  flex-col items-center justify-center bg-[#10162F] p-10 md:mt-8 lg:mt-0 lg:h-[80%] lg:w-[30vw]">

          <img
            src={editUser?.avatar}
            alt='user-avatar'
            className="h-36 w-36 rounded-full border-2 border-gray-300 "
          />

          <div className="flex gap-x-2">
            <p className="mt-5 text-lg">{editUser?.first_name}</p>
            <p className="mt-5 text-lg">{editUser?.last_name}</p>
          </div>

          <p className="mt-5 text-2xl">{editUser?.email}</p>
        </div>


        <div className="flex w-full flex-col justify-center self-center  border-2 bg-white p-6 text-black lg:h-[80%]  lg:w-[50vw] lg:px-10">

          <div id="heading" className="flex items-center justify-between pb-6 pt-3">
            <p className="text-3xl font-semibold text-black">Personal Information</p>
          </div>

          <div className="flex flex-wrap lg:justify-between">

            <div className="mb-2 mt-5 w-full lg:w-[45%]">
              <p className="py-1 text-lg">First Name</p>

              <label htmlFor="first-name" className='flex flex-col'>
                <div className="flex  items-center gap-4">

                  <input
                    onChange={handleChange}
                    readOnly={!isEditing}
                    type="text"
                    name="firstName"
                    value={userInfo?.firstName}
                    id="first-name"
                    placeholder='Not Provided'
                    className='w-10/12 border-none bg-transparent  text-xl outline-none' />
                </div>
                <hr className="my-1" />
              </label>
            </div>

            <div className="mb-2 mt-5 w-full lg:w-[45%]">
              <p className="py-1 text-lg">Last Name</p>

              <label htmlFor="first-name" className='flex flex-col'>
                <div className="flex  items-center gap-4">

                  <input
                    onChange={handleChange}
                    readOnly={!isEditing}
                    type="text"
                    name="lastName"
                    value={userInfo?.lastName}
                    id="last-name"
                    placeholder='Not Provided'
                    className='w-10/12 border-none bg-transparent  text-xl outline-none' />
                </div>
                <hr className="my-1" />
              </label>
            </div>

            <div className="mb-2 mt-5 w-full lg:w-[45%]">
              <p className="py-1 text-lg">Email</p>

              <label htmlFor="email" className='flex flex-col '>
                <div className="flex  items-center gap-4 ">

                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    value={userInfo?.email}
                    id="userEmail"
                    placeholder='Not Provided'
                    className='w-10/12  border-none  bg-transparent text-xl outline-none' />
                </div>
                <hr className="my-1" />
              </label>
            </div>


            <div className="relative mt-8 flex w-full items-center justify-between">

              <div id="editButton" className="">
                <label htmlFor="edit" className="flex h-12 w-32 cursor-pointer items-center justify-center rounded-xl border border-[#10162F] bg-inherit
    text-black transition-all duration-300 ease-in-out hover:bg-[#10162F] hover:text-white ">{isEditing ? "Cancel Edit" : "Edit"}</label>
                <button onClick={handleEditButton} id="edit" className="hidden"></button>
              </div>

              {isEditing && <div id="submitButton" className="">
                <label htmlFor="submit" className="flex h-12 w-32 cursor-pointer items-center justify-center rounded-xl border border-[#10162F] bg-inherit
    text-black transition-all duration-300 ease-in-out hover:bg-[#10162F] hover:text-white "><p>Save</p></label>
                <button onSubmit={handleSubmit} type="submit" id="submit" className="hidden"></button>
              </div>
              }
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditUser