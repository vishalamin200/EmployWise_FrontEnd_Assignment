import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import EditUser from './pages/EditUser'
import LoginPage from './pages/LoginPage'
import Users from './pages/Users'

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/user-list" element={<Users />} />
                    <Route path="/edit-user" element={<EditUser />} />
                </Routes>
            </BrowserRouter>
            <Toaster />
        </div>
    )
}

export default App