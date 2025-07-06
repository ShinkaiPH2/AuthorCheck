import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Navbar } from '../components/ui/Navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.23 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" stroke="#a78bfa" strokeWidth="2" fill="none"/>
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.23 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" stroke="#a78bfa" strokeWidth="2" fill="none"/>
          </svg>
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">404 - Page Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">Sorry, the page you're looking for doesn't exist.</p>
          <div className="flex gap-4">  
            <Link to="/">
              <Button variant="primary">Go to Home</Button>
            </Link>
            <Link to="/analyze">
              <Button variant="outline">Analyze Text</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 