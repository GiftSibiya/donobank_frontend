import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import { Button } from '../../components/ui/button';
import { Heart, DollarSign, Users, Github, Phone } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen ring-1 ring-red-500 w-[100vw] bg-gray-50 flex flex-col">
      <Navigation />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-full">
              <Heart className="h-12 w-12 text-blue-600" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to DonoBank
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track and manage your charitable donations with ease.
            Keep organized records of all your contributions and their status.
          </p>

          <div className="flex justify-center space-x-4">
            <Link to="/donations">
              <Button size="lg" className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                View Donations
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Donations</h3>
            <p className="text-gray-600">Keep detailed records of all your charitable contributions</p>
          </div>

          <div className="text-center">
            <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Status</h3>
            <p className="text-gray-600">Update donation status from Pending to Completed or Failed</p>
          </div>

          <div className="text-center">
            <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Interface</h3>
            <p className="text-gray-600">Clean, modern interface built with shadcn/ui components</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-semibold">Gift Sibiya</p>
              <p className="text-gray-300 text-sm">Full Stack Developer</p>
            </div>

            <div className="flex items-center space-x-6">
              <a
                href="https://github.com/GiftSibiya/donobank_frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>

              <a
                href="https://wa.me/27712442080"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 DonoBank. Built with React, TypeScript, and Supabase.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
