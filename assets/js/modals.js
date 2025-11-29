// Open modal
document.querySelectorAll('[data-show-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-show-modal');
        const dialog = document.getElementById(modalId);
        
        const backdrop = document.createElement('div');
        backdrop.className = 'custom-backdrop';
        backdrop.dataset.modalId = modalId;
        backdrop.dataset.close = modalId;
        document.body.appendChild(backdrop);
        
        dialog.showModal();
        dialog.classList.add('opening');
        
        requestAnimationFrame(() => {
            backdrop.classList.add('show');
        });
        
        setTimeout(() => dialog.classList.remove('opening'), 300);
    });
});

// Close modal
document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close');
        const dialog = document.getElementById(modalId);
        const backdrop = document.querySelector(`.custom-backdrop[data-modal-id="${modalId}"]`);
        
        closeModal(dialog, backdrop);
    });
});

// Close current modal when clicking outside of it
document.addEventListener('click', (e) => {
    if (e.target === document.documentElement) {
        const backdrop = document.querySelector(".custom-backdrop");
        const modalId = backdrop.getAttribute('data-modal-id');
        const dialog = document.getElementById(modalId);
        
        closeModal(dialog, backdrop);
    }
});

function closeModal(dialog, backdrop) {
    dialog.classList.add('closing');
    
    if (backdrop) {
        backdrop.classList.remove('show');
    }
    
    setTimeout(() => {
        dialog.classList.remove('closing');
        dialog.close();
        if (backdrop) {
            backdrop.remove();
        }
    }, 300);
}

function closeModal(dialog, backdrop) {
    dialog.classList.add('closing');
    
    if (backdrop) {
        backdrop.classList.remove('show');
    }
    
    setTimeout(() => {
        dialog.classList.remove('closing');
        dialog.close();
        if (backdrop) {
            backdrop.remove();
        }
    }, 300);
}