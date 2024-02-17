import Layout from "./Layout";
import Header from "./components/Header"
import Post from "./components/Post"
import HomePage from "./pages/HomePage"
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePostPage from "./pages/CreatePostPage";

function App() {
  return ( 
    <>
    <UserContextProvider>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index exact element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePostPage />} />
        </Route>
      </Routes> 
      </UserContextProvider>
    </>
  )
}

export default App
