import './App.css'
import MainPage from './pages/MainPage'
import LandingPage from './pages/LandingPage'
import Header from './components/layout/header/header.jsx'
import SearchInput from './components/ui/search-input/search-input.jsx'
import Sidebar from './components/ui/sidebar/side-bar.jsx'
import PostList from './components/layout/posts-list/post-list.jsx'
import TeacherList from './components/layout/teachers-list/teacher-list.jsx'
import PostInfo from './components/layout/post-info/post-info.jsx'
import RegisterForm from './components/ui/register-form/register-form.jsx'
import VerifyForm from './components/ui/verify-form/verify-form.jsx'
import LoginForm from './components/ui/login-form/login-form.jsx'
import AddPostForm from './components/ui/post-page/add-post.jsx'
import AddTeacherForm from './components/ui/teacher-form/teacher-form.jsx'
import AddPostBtn from './components/ui/add-post-btn/add-post-btn.jsx'
import AddTeacherBtn from './components/ui/add-teacher-btn/add-teacher-btn.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AuthService from './services/authService.js'
import { AuthProvider } from './context/AuthContext.jsx'
import { useEffect, useState } from 'react'

function App() {
  const [categoryId, setCategoryId] = useState(2);
  const [instituteId, setInstituteId] = useState(2);
  const [searchTeacherQuery, setSearchTeacherQuery] = useState("");
  
  const OnSetCategoryId = (category_id) => {
    setCategoryId(category_id);
  }

  const OnSetInstituteId = (institute_id) => {
    setInstituteId(institute_id);
  }

  const handleTeacherSearchChange = (e) => {
    setSearchTeacherQuery(e.target.value);
  }

  return (
    <AuthProvider>
      <Router>
        <Header search={<SearchInput value={searchTeacherQuery} onChange={handleTeacherSearchChange} />} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/register' element={<RegisterForm/>} />
          <Route path='/verification' element={<VerifyForm/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/posts' element= 
              {<MainPage left={<Sidebar OnSetCategoryId={OnSetCategoryId} OnSetInstituteId={OnSetInstituteId}/>} center={<PostList  category_id={categoryId}/>} rigth={<AddPostBtn/>} />}
          />
          <Route path='/teachers' element= 
              {<MainPage left={<Sidebar OnSetCategoryId={OnSetCategoryId} OnSetInstituteId={OnSetInstituteId}/>} center={<TeacherList  institute_id={instituteId} searchValue={searchTeacherQuery} onSearchChange={handleTeacherSearchChange}/>} rigth={<AddTeacherBtn/>} />}
          />
          <Route path='/post/:id' element= 
              {<MainPage left={<Sidebar OnSetCategoryId={OnSetCategoryId} OnSetInstituteId={OnSetInstituteId}/>} center={<PostInfo/>} />}
          />
           <Route path='/posts/add' element= 
              {<MainPage left={<Sidebar OnSetCategoryId={OnSetCategoryId} OnSetInstituteId={OnSetInstituteId}/>} center={<AddPostForm/>} />}
          />
           <Route path='/teachers/add' element= 
              {<MainPage left={<Sidebar OnSetCategoryId={OnSetCategoryId} OnSetInstituteId={OnSetInstituteId}/>} center={<AddTeacherForm/>} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
