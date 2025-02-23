// Get elements from CSS to create variables
const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');

// Toggle sidebar
toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    toggleBtn.classList.toggle('active');
    content.classList.toggle('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        toggleBtn.classList.remove('active');
        content.classList.remove('active');
    }
}); 