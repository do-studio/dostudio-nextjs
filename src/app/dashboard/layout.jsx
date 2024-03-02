import Sidebar from '../../components/dashboard/sidebar'
import Header from '../../components/dashboard/header'
import Footer from '../../components/dashboard/footer'

const DashboardLayout = ({children}) => {

  return (
    <div className='flex min-h-screen'>
        <div className='w-auto md:w-[25%] lg:w-[15%] flex flex-col'>
            <Sidebar/>
        </div>
        <div className='w-full md:w-[75%] lg:w-[85%] flex flex-col justify-between'>
            <div>
                <Header/>
                {children}
            </div>
            <Footer/>
        </div>
    </div>
  )
}

export default DashboardLayout