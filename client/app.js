// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// DOM Elements
const projectForm = document.getElementById('projectForm');
const projectsContainer = document.getElementById('projectsContainer');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    
    projectForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await createProject();
    });
});

// API Functions
async function fetchProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        return await response.json();
    } catch (error) {
        console.error('Error fetching projects:', error);
        showError('Failed to load projects');
        return [];
    }
}

async function createProject() {
    const name = document.getElementById('projectName').value;
    const description = document.getElementById('projectDesc').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description })
        });
        
        if (!response.ok) throw new Error('Failed to create project');
        
        // Clear form and refresh projects
        projectForm.reset();
        loadProjects();
    } catch (error) {
        console.error('Error creating project:', error);
        showError('Failed to create project');
    }
}

// UI Functions
async function loadProjects() {
    const projects = await fetchProjects();
    renderProjects(projects);
}

function renderProjects(projects) {
    if (!projects || projects.length === 0) {
        projectsContainer.innerHTML = '<p class="no-projects">No projects found. Create your first project!</p>';
        return;
    }

    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card">
            <h3>${escapeHtml(project.name)}</h3>
            ${project.description ? `<p>${escapeHtml(project.description)}</p>` : ''}
            <div class="project-meta">
                <span>Created: ${formatDate(project.createdAt)}</span>
                <span>ID: ${project.id}</span>
            </div>
        </div>
    `).join('');
}

function showError(message) {
    // Simple error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Add some basic styling
    errorDiv.style.position = 'fixed';
    errorDiv.style.top = '20px';
    errorDiv.style.right = '20px';
    errorDiv.style.backgroundColor = '#f8d7da';
    errorDiv.style.color = '#721c24';
    errorDiv.style.padding = '1rem';
    errorDiv.style.borderRadius = '4px';
    errorDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    errorDiv.style.zIndex = '1000';
    
    document.body.appendChild(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Utility Functions
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
