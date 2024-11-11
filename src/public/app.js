// Utility function for API calls
async function apiCall(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
    };

    try {
        const response = await fetch(`/api${endpoint}`, {
            ...options,
            headers
        });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'API call failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Health check
async function checkHealth() {
    const resultElement = document.getElementById('health-result');
    try {
        const data = await apiCall('/health');
        resultElement.textContent = JSON.stringify(data, null, 2);
        resultElement.style.color = 'var(--success-color)';
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
        resultElement.style.color = 'var(--error-color)';
    }
}

// User registration
async function handleRegister(event) {
    event.preventDefault();
    const resultElement = document.getElementById('register-result');
    const formData = new FormData(event.target);

    try {
        const data = await apiCall('/users/register', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData))
        });
        
        resultElement.textContent = JSON.stringify(data, null, 2);
        resultElement.style.color = 'var(--success-color)';
        event.target.reset();
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
        resultElement.style.color = 'var(--error-color)';
    }
}

// User login
async function handleLogin(event) {
    event.preventDefault();
    const resultElement = document.getElementById('login-result');
    const formData = new FormData(event.target);

    try {
        const data = await apiCall('/users/login', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData))
        });
        
        localStorage.setItem('token', data.token);
        resultElement.textContent = 'Login successful!';
        resultElement.style.color = 'var(--success-color)';
        event.target.reset();
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
        resultElement.style.color = 'var(--error-color)';
    }
}

// Create task
async function handleCreateTask(event) {
    event.preventDefault();
    const resultElement = document.getElementById('task-result');
    const formData = new FormData(event.target);

    try {
        const data = await apiCall('/tasks', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData))
        });
        
        resultElement.textContent = JSON.stringify(data, null, 2);
        resultElement.style.color = 'var(--success-color)';
        event.target.reset();
        loadTasks(); // Refresh task list
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
        resultElement.style.color = 'var(--error-color)';
    }
}

// Load tasks
async function loadTasks() {
    const tasksContainer = document.getElementById('tasks-list');
    
    try {
        const tasks = await apiCall('/tasks');
        
        if (tasks.length === 0) {
            tasksContainer.innerHTML = '<p>No tasks found</p>';
            return;
        }

        tasksContainer.innerHTML = tasks.map(task => `
            <div class="task-item">
                <h4>${task.title}</h4>
                <p>${task.description || 'No description'}</p>
                <p>Status: ${task.status}</p>
                ${task.due_date ? `<p>Due: ${new Date(task.due_date).toLocaleString()}</p>` : ''}
            </div>
        `).join('');
    } catch (error) {
        tasksContainer.innerHTML = `<p style="color: var(--error-color)">Error: ${error.message}</p>`;
    }
}