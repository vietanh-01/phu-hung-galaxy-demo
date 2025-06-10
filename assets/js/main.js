// Simple script for category filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => {
                b.classList.remove('bg-[#1A2D40]', 'text-white');
                b.classList.add('bg-[#EAE3D6]', 'hover:bg-[#1A2D40]', 'hover:text-white');
            });
            
            // Add active class to clicked button
            this.classList.remove('bg-[#EAE3D6]', 'hover:bg-[#1A2D40]', 'hover:text-white');
            this.classList.add('bg-[#1A2D40]', 'text-white');
            
            // Here you would typically filter products
            // For demo purposes, we're just showing all products
        });
    });
}); 