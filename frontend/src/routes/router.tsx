import ProtectedRoute from '@/components/protected-route';
import AuthLayout from '@/components/shared/auth-layout';
import CreateProject from '@/pages/create-project';
import Dashboard from '@/pages/dashboard';
import LoginPage from '@/pages/login';
import ProjectDetails from '@/pages/project-details';
import SignUp from '@/pages/signup';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';


function Router() {
  


  const router = createBrowserRouter([
    {
      path:"/",
      element:<ProtectedRoute>
        <Dashboard />
        </ProtectedRoute>
    },
    {
      path:"/project/create",
      element:<ProtectedRoute>
              <AuthLayout title="Create Project">
              <CreateProject />
              </AuthLayout>
        </ProtectedRoute>
    },
    {
      path:"/:projectId",
      element:<ProtectedRoute>
        <ProjectDetails />
      </ProtectedRoute>
    },
    {
      path:"/login",
      element:<LoginPage />
    },
    {
      path:"/sign-up",
      element:<SignUp />
    }

  ])

  


  return (
    <RouterProvider router={router} />
  )
}

export default Router