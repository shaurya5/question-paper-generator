import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PostQuestion from './pages/PostQuestion'
import GenerateQuesPaper from "./pages/GenerateQuesPaper";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/post-question',
    element: <PostQuestion />
  }, 
  {
    path: '/generate-paper',
    element: <GenerateQuesPaper />
  }
])

export default router;