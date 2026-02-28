import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import '../styles/Dashboard.css';

export default function Dashboard({ user }) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className='nav'>
                <Navbar user={user} />

            </div>
            <div className='content'>
                <h1>Content</h1>
            </div>
            <Footer />
        </div>
    )
}