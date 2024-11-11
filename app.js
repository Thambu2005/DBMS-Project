// Mock data for applications
let applications = [
    { id: '1', studentName: 'John Doe', reason: 'Conference', date: '2024-03-15', proofFile: 'conference_invite.pdf', status: 'pending' },
    { id: '2', studentName: 'Jane Smith', reason: 'Workshop', date: '2024-03-20', proofFile: 'workshop_details.pdf', status: 'pending' },
];

// Current user
let currentUser = null;

// DOM Elements
const app = document.getElementById('app');

// Render functions
function renderLogin() {
    app.innerHTML = `
        <div class="flex items-center justify-center min-h-screen">
            <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
                <h3 class="text-2xl font-bold text-center flex items-center justify-center">
                    <i data-lucide="user" class="mr-2"></i> Login to Your Account
                </h3>
                <form id="loginForm">
                    <div class="mt-4">
                        <div>
                            <label class="block" for="username">Username</label>
                            <input type="text" placeholder="Username" id="username"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                required>
                        </div>
                        <div class="mt-4">
                            <label class="block" for="password">Password</label>
                            <input type="password" placeholder="Password" id="password"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                required>
                        </div>
                        <div class="mt-4">
                            <label class="block">Role</label>
                            <select id="role"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                                <option value="student">Student</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>
                        <div class="flex items-baseline justify-between">
                            <button class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Add event listener to the login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    lucide.createIcons();
}

function renderStudentDashboard() {
    app.innerHTML = `
        <div class="container mx-auto p-4">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold">Student Dashboard</h1>
                <button id="logoutBtn" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
                    <i data-lucide="log-out" class="mr-2"></i> Logout
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h2 class="text-2xl font-semibold mb-4">Apply for On-Duty Leave</h2>
                    <form id="applicationForm">
                        <div class="mb-4">
                            <label for="reason" class="block text-sm font-medium text-gray-700">Reason</label>
                            <input type="text" id="reason" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
                        </div>
                        <div class="mb-4">
                            <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
                            <input type="date" id="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
                        </div>
                        <div class="mb-4">
                            <label for="proof" class="block text-sm font-medium text-gray-700">Upload Proof</label>
                            <div class="mt-1 flex items-center">
                                <input type="file" id="proof" class="hidden" accept=".pdf,.png,.jpg,.jpeg,.zip">
                                <label for="proof" class="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <i data-lucide="file-up" class="w-5 h-5 inline-block mr-2"></i>
                                    Choose file
                                </label>
                                <span id="fileName" class="ml-3">No file chosen</span>
                            </div>
                        </div>
                        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <i data-lucide="send" class="w-5 h-5 mr-2"></i> Submit Application
                        </button>
                    </form>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h2 class="text-2xl font-semibold mb-4">Your Applications</h2>
                    <ul id="applicationsList" class="divide-y divide-gray-200"></ul>
                </div>
            </div>
        </div>
    `;

    // Add event listeners
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('applicationForm').addEventListener('submit', handleApplicationSubmit);
    document.getElementById('proof').addEventListener('change', handleFileChange);

    // Render applications list
    renderApplicationsList();
    lucide.createIcons();
}

function renderStaffDashboard() {
    app.innerHTML = `
        <div class="container mx-auto p-4">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold">Staff Dashboard</h1>
                <button id="logoutBtn" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
                    <i data-lucide="log-out" class="mr-2"></i> Logout
                </button>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-2xl font-semibold mb-4">Pending Applications</h2>
                <ul id="pendingApplicationsList" class="divide-y divide-gray-200"></ul>
            </div>

            <div class="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-2xl font-semibold mb-4">Recent Decisions</h2>
                <ul id="recentDecisionsList" class="divide-y divide-gray-200"></ul>
            </div>
        </div>
    `;

    // Add event listener to logout button
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Render applications lists
    renderPendingApplicationsList();
    renderRecentDecisionsList();
    lucide.createIcons();
}

function renderApplicationsList() {
    const applicationsList = document.getElementById('applicationsList');
    const userApplications = applications.filter(app => app.studentName === currentUser.username);

    if (userApplications.length === 0) {
        applicationsList.innerHTML = '<p>No applications submitted yet.</p>';
    } else {
        applicationsList.innerHTML = userApplications.map(app => `
            <li class="py-4">
                <div class="flex justify-between">
                    <div>
                        <p class="font-semibold">${app.reason}</p>
                        <p class="text-sm text-gray-500">${app.date}</p>
                    </div>
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                    }">
                        ${app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                </div>
                ${app.feedback ? `<p class="mt-1 text-sm text-gray-600">Feedback: ${app.feedback}</p>` : ''}
            </li>
        `).join('');
    }
}

function renderPendingApplicationsList() {
    const pendingApplicationsList = document.getElementById('pendingApplicationsList');
    const pendingApplications = applications.filter(app => app.status === 'pending');

    if (pendingApplications.length === 0) {
        pendingApplicationsList.innerHTML = '<p>No pending applications.</p>';
    } else {
        pendingApplicationsList.innerHTML = pendingApplications.map(app => `
            <li class="py-4">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-semibold">${app.studentName}</p>
                        <p class="text-sm text-gray-500">${app.reason} - ${app.date}</p>
                        ${app.proofFile ? `
                            <a href="#" class="text-blue-600 hover:underline flex items-center mt-1">
                                <i data-lucide="file-text" class="w-4 h-4 mr-1"></i> View Proof
                            </a>
                        ` : ''}
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="handleApprove('${app.id}')" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center">
                            <i data-lucide="check-circle" class="w-4 h-4 mr-1"></i> Approve
                        </button>
                        <button onclick="handleReject('${app.id}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
                            <i data-lucide="x-circle" class="w-4 h-4 mr-1"></i> Reject
                        </button>
                    </div>
                </div>
            </li>
        `).join('');
    }
    lucide.createIcons();
}

function renderRecentDecisionsList() {
    const recentDecisionsList = document.getElementById('recentDecisionsList');
    const recentDecisions = applications.filter(app => app.status !== 'pending');

    if (recentDecisions.length === 0) {
        recentDecisionsList.innerHTML = '<p>No recent decisions.</p>';
    } else {
        recentDecisionsList.innerHTML = recentDecisions.map(app => `
            <li class="py-4">
                <div class="flex justify-between">
                    <div>
                        <p class="font-semibold">${app.studentName}</p>
                        <p class="text-sm text-gray-500">${app.reason} - ${app.date}</p>
                    </div>
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        app.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }">
                        ${app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                </div>
                ${app.feedback ? `<p class="mt-1 text-sm text-gray-600">Feedback: ${app.feedback}</p>` : ''}
            </li>
        `).join('');
    }
}

// Event handlers
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // In a real application, you would validate credentials here
    currentUser = { username, role };
    localStorage.setItem('user', JSON.stringify(currentUser));

    if (role === 'student') {
        renderStudentDashboard();
    } else {
        renderStaffDashboard();
    }
}

function handleLogout() {
    localStorage.removeItem('user');
    currentUser = null;
    renderLogin();
}

function handleApplicationSubmit(e) {
    e.preventDefault();
    const reason = document.getElementById('reason').value;
    const date = document.getElementById('date').value;
    const proofFile = document.getElementById('proof').files[0];

    const newApplication = {
        id: Date.now().toString(),
        studentName: currentUser.username,
        reason,
        date,
        proofFile: proofFile ? proofFile.name : null,
        status: 'pending'
    };

    applications.push(newApplication);
    renderApplicationsList();

    // Reset form
    e.target.reset();
    document.getElementById('fileName').textContent = 'No file chosen';

    alert('Application submitted successfully!');
}

function handleFileChange(e) {
    const fileName = e.target.files[0] ? e.target.files[0].name : 'No file chosen';
    document.getElementById('fileName').textContent = fileName;
}

function handleApprove(id) {
    applications = applications.map(app =>
        app.id === id ? { ...app, status: 'approved', feedback: 'Application approved.' } : app
    );
    renderPendingApplicationsList();
    renderRecentDecisionsList();
}

function handleReject(id) {
    const feedback = prompt('Enter rejection reason:');
    if (feedback) {
        applications = applications.map(app =>
            app.id === id ? { ...app, status: 'rejected', feedback } : app
        );
        renderPendingApplicationsList();
        renderRecentDecisionsList();
    }
}

// Initial render
function init() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        if (currentUser.role === 'student') {
            renderStudentDashboard();
        } else {
            renderStaffDashboard();
        }
    } else {
        renderLogin();
    }
}

init();