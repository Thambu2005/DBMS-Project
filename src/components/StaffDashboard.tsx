import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, FileText, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OnDutyApplication {
  id: string;
  studentName: string;
  reason: string;
  date: string;
  proofFile: string | null;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
}

const StaffDashboard: React.FC = () => {
  const [applications, setApplications] = useState<OnDutyApplication[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real application, fetch applications from an API
    const mockApplications: OnDutyApplication[] = [
      { id: '1', studentName: 'John Doe', reason: 'Conference', date: '2024-03-15', proofFile: 'conference_invite.pdf', status: 'pending' },
      { id: '2', studentName: 'Jane Smith', reason: 'Workshop', date: '2024-03-20', proofFile: 'workshop_details.pdf', status: 'pending' },
    ];
    setApplications(mockApplications);
  }, []);

  const handleApprove = (id: string) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: 'approved', feedback: 'Application approved.' } : app
    ));
  };

  const handleReject = (id: string, feedback: string) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: 'rejected', feedback } : app
    ));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Staff Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <LogOut className="mr-2" /> Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Pending Applications</h2>
        {applications.filter(app => app.status === 'pending').length === 0 ? (
          <p>No pending applications.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {applications.filter(app => app.status === 'pending').map((app) => (
              <li key={app.id} className="py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{app.studentName}</p>
                    <p className="text-sm text-gray-500">{app.reason} - {app.date}</p>
                    {app.proofFile && (
                      <a href="#" className="text-blue-600 hover:underline flex items-center mt-1">
                        <FileText className="w-4 h-4 mr-1" /> View Proof
                      </a>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(app.id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" /> Approve
                    </button>
                    <button
                      onClick={() => {
                        const feedback = prompt('Enter rejection reason:');
                        if (feedback) handleReject(app.id, feedback);
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                    >
                      <XCircle className="w-4 h-4 mr-1" /> Reject
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Recent Decisions</h2>
        <ul className="divide-y divide-gray-200">
          {applications.filter(app => app.status !== 'pending').map((app) => (
            <li key={app.id} className="py-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{app.studentName}</p>
                  <p className="text-sm text-gray-500">{app.reason} - {app.date}</p>
                </div>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  app.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>
              {app.feedback && (
                <p className="mt-1 text-sm text-gray-600">Feedback: {app.feedback}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StaffDashboard;