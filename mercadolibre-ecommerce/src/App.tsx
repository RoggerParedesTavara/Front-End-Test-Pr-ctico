import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.sass'
import { DetailBox } from './components/detail-box'
import { Main } from './components/main'
import { SearchBox } from './components/search-box'

function App() {

  return (
    <BrowserRouter>
        <SearchBox/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/items/:id' element={<DetailBox/>}/>
        <Route path='*' element={<Main />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
