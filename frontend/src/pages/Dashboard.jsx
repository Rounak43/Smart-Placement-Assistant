import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import '../styles/Dashboard.css';

export default function Dashboard({ user }) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className='nav'>
                <Navbar user={user} />
            </div>
            <div className='content'>
                
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}