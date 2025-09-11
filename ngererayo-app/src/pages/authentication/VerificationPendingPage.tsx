import { Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const VerificationPendingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Verification Pending
            </h1>
            <p className="text-gray-600">
              Your documents have been submitted successfully and are under review by our admin team.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-medium text-gray-900 mb-1">What happens next?</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Admin will review your documents within 24-48 hours</li>
                  <li>• You'll receive an email notification with the result</li>
                  <li>• Once approved, you can start selling on Ngererayo</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="block w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/"
              className="block w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPendingPage;