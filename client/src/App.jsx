import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';

// Layout
import Layout from './components/Layout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StoryView from './pages/StoryView';
import Leaderboard from './pages/Leaderboard';
import QuizPage from './pages/QuizPage';
import AdminDashboard from './pages/AdminDashboard';
import SubscriptionSuccess from './pages/SubscriptionSuccess';
import SubscriptionCancel from './pages/SubscriptionCancel';
import NotFound from './pages/NotFound';

// Admin Pages
import CreateStory from './pages/admin/CreateStory';
import ManageUsers from './pages/admin/ManageUsers';
import ManageStories from './pages/admin/ManageStories';
import Settings from './pages/admin/Settings';

// Protected Routes
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="quiz" element={<QuizPage />} />
            
            {/* Protected Routes */}
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="story/:id" element={<ProtectedRoute><StoryView /></ProtectedRoute>} />
            <Route path="subscription/success" element={<ProtectedRoute><SubscriptionSuccess /></ProtectedRoute>} />
            <Route path="subscription/cancel" element={<ProtectedRoute><SubscriptionCancel /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="admin/stories/create" element={<AdminRoute><CreateStory /></AdminRoute>} />
            <Route path="admin/stories" element={<AdminRoute><ManageStories /></AdminRoute>} />
            <Route path="admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
            <Route path="admin/settings" element={<AdminRoute><Settings /></AdminRoute>} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 