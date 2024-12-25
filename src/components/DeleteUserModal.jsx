import { useDispatch } from "react-redux";

import { deleteUser } from "../redux-toolkit/UserSlice";

const DeleteUserModal = () => {

    const dispatch = useDispatch()

    const handleDeleteUser = async (e) => {
        e.preventDefault();
        document.getElementById("delete-user-modal").close()
        await dispatch(deleteUser())
    }
    return (
        <dialog id="delete-user-modal" className="modal modal-middle h-56 w-96 rounded-xl   transition-all duration-500">
            <div className="modal-box flex flex-col gap-y-4 px-8 pt-4">
                <h3 className="font-bold sm:text-base md:text-lg">Are you sure you want to delete this user?</h3>
                <p className="text-lg">This action can not be undone</p>
            </div>
            <div className="modal-action">
                <form method="dialog" className="mt-8 flex justify-around gap-x-6">
                    <button className="btn rounded-xl border border-black bg-transparent px-4 py-2 text-lg font-bold">Cancel</button>
                    <button onClick={handleDeleteUser} className="btn rounded-xl bg-red-700 px-4 py-2 text-lg font-bold text-white ">Delete</button>
                </form>
            </div>

        </dialog>
    )
}

export default DeleteUserModal