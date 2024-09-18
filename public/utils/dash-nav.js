document.querySelectorAll('.course-tabs .tab').forEach(tab => {
    tab.addEventListener('click', function () {
        // Remove active class from all tabs
        document.querySelectorAll('.course-tabs .tab').forEach(item => item.classList.remove('active'));
        // Add active class to the clicked tab
        this.classList.add('active');

        // Hide all course sections and reset their opacity
        document.querySelectorAll('.course').forEach(section => {
            section.classList.remove('active');
            section.style.opacity = 0; // Reset opacity for fade-in effect
        });

        // Show the target section with fade-in effect
        const target = this.getAttribute('data-target');
        const targetSection = document.querySelector(`.course.${target}`);

        if (targetSection) {
            targetSection.classList.add('active');
            // Force a reflow to restart the animation
            targetSection.offsetHeight; // This line is important to trigger reflow
            targetSection.style.opacity = 1; // Trigger the fade-in effect
        }
    });
});
