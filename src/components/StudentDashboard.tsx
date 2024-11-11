import React, { useState, useEffect } from 'react';
import { FileUp, Send, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OnDutyApplication {
  id: string;
  reason: string;
  date: string;
  proofFile: File | null;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
}

const StudentDashboard: React.FC = () => {
  const [applications, setApplications] = useState<OnDutyApplication[]>([]);
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real application, fetch applications from an API
    const mockApplications: OnDutyApplication[] = [
      { id: '1', reason: 'Conference', date: '2024-03-15', proofFile: null, status: 'approved', feedback: 'Approved. Enjoy the conference!' },
      { id: '2', reason: 'Workshop', date: '2024-03-20', proofFile: null, status: 'pending' },
    ];
    setApplications(mockApplications);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApplication: OnDutyApplication = {
      id: Date.now().toString(),
      reason,
      date,
      proofFile,
      status: 'pending'
    };
    setApplications([...applications, newApplication]);
    setReason('');
    setDate('');
    setProofFile(null);
    alert('Application submitted successfully!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProofFile(e.target.files[0]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <LogOut className="mr-2" /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Apply for On-Duty Leave</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
              <input
                type="text"
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="proof" className="block text-sm font-medium text-gray-700">Upload Proof</label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  id="proof"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg,.zip"
                />
                <label
                  htmlFor="proof"
                  className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FileUp className="w-5 h-5 inline-block mr-2" />
                  Choose file
                </label>
                <span className="ml-3">{proofFile ? proofFile.name : 'No file chosen'}</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Send className="w-5 h-5 mr-2" /> Submit Application
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Applications</h2>
          {applications.length === 0 ? (
            <p>No applications submitted yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {applications.map((app) => (
                <li key={app.id} className="py-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{app.reason}</p>
                      <p className="text-sm text-gray-500">{app.date}</p>
                    </div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      app.status === 'approved' ? 'bg-green-100 text-green-800' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
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
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;