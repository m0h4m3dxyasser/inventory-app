const modal = document.getElementById('password-modal');
const triggerBtn = document.getElementById('update-btn') || document.getElementById('delete-btn') || document.getElementById('delete-category-btn');
const cancelBtn = document.getElementById('cancel-btn');

triggerBtn.addEventListener('click', () => {
    modal.showModal();
});

cancelBtn.addEventListener('click', () => {
    modal.close();
});