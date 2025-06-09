import './App.css'
import Content from './Components/Content/Content'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import { useSelector } from 'react-redux'
import { selectUserState } from './Store/selectors'
import Login from './Components/Auth/Login'

function App() {

  const state = useSelector(selectUserState)

  return (
    <div>
      {state.resultCode === 1000 ?
      <div className='container'>
        <Header />
        <Content />
        <Footer />
      </div> :
      <div>
        <Login />
      </div>
      }
    </div>
  )
}

export default App
