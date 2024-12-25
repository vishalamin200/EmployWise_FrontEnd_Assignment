import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import deleteIcon from '../assets/Icons/delete-logo.png';
import editIcon from '../assets/Icons/edit-icon.svg';
import DeleteUserModal from "../components/DeleteUserModal";
import { addFetchPage, fetchUsers, setDeleteUserId, setEditUser, setNextPage, setPrevPage } from "../redux-toolkit/UserSlice";

function Users() {
  const { users, page, totalPages, fetchPage } = useSelector((state) => state?.User)

  const dispatch = useDispatch()
  const navigate = useNavigate('/')

  useEffect(() => {

    const fetchUsersData = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          toast.error("Unauthorized User");
          navigate('/')
          return
        }
        await dispatch(fetchUsers(page));
      } catch (err) {
        toast.error("Failed to fetch users", err);
        navigate('/')
      }
    }

    if (!fetchPage[page]) {
      fetchUsersData();
      dispatch(addFetchPage(page))
    }
  }, [page]);

  const handleEdit = (id) => {
    dispatch(setEditUser(id))
    navigate('/edit-user')
  };

  const handleDelete = (userId) => {
    dispatch(setDeleteUserId(userId))
    document.getElementById('delete-user-modal').showModal()
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <h1 className="mb-4 mt-5 text-3xl font-bold">Users</h1>
      <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {users?.map((user) => (
          <div
            key={user.id}
            className="relative transform rounded-lg bg-white p-4 shadow-lg transition-transform duration-500 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt='user-avatar'
                className="h-24 w-24 rounded-full border-2 border-gray-300 "
              />
              <div className="ml-6">
                <h2 className="text-lg font-bold">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="absolute right-4 top-4 flex gap-2 ">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleEdit(user.id)}
              >
                <img src={editIcon} alt="edit-icon" className="h-4" />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(user.id)}
              >
                <img src={deleteIcon} alt="delete-icon" className="h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-28 flex items-center justify-center gap-x-6">
        <button
          className="w-24 rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          onClick={() => dispatch(setPrevPage())}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          className="w-24 rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          onClick={() => dispatch(setNextPage())}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      <DeleteUserModal />
    </div>
  );
}

export default Users;