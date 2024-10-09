import { ToastContainer } from 'react-toastify'
import { RegisterPage } from './pages/register-page.ui'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <RegisterPage></RegisterPage>
    </div>
  )
}

export default App
