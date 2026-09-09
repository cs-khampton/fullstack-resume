import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Contact from './components/Contact.jsx'
import Layout from './components/Layout.jsx'
import Projects from './components/Projects.jsx'
import Resume from './components/Resume.jsx'
import Skills from './components/Skills.jsx'
import './styles/index.css'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/skills', element: <Skills /> },
      { path: '/projects', element: <Projects /> },
      { path: '/resume', element: <Resume /> },
      { path: '/contact', element: <Contact /> }
      // Gallery?
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)