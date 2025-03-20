document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const body = document.body;
    const copyButton = document.getElementById('copyButton');
    const websiteButton = document.getElementById('websiteButton');
    const toast = document.getElementById('toast');
    const steps = document.querySelectorAll('.step');
    
    // Create mouse follower element for desktop
    const mouseFollower = document.createElement('div');
    mouseFollower.className = 'mouse-follower';
    document.body.appendChild(mouseFollower);

    // For smooth animation
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    // Sample discount code - replace with your actual code
    const discountCode = "Rahul Cheat Story";
    
    // Device detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Animation for steps on scroll
    function animateOnScroll() {
        steps.forEach(step => {
            const stepPosition = step.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (stepPosition < screenPosition) {
                step.style.opacity = "1";
                step.style.transform = "translateX(0)";
            }
        });
    }
    
    // Run animations once DOM is loaded
    animateOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Setup gradient animation (similar to aceternity.com)
    if (!body.querySelector('.gradient-background')) {
        const gradientContainer = document.createElement('div');
        gradientContainer.className = 'gradient-background';
        
        const gradients = [
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div')
        ];
        
        gradients.forEach((gradient, index) => {
            gradient.className = `gradient-circle gradient-${index + 1}`;
            gradientContainer.appendChild(gradient);
        });
        
        body.insertBefore(gradientContainer, body.firstChild);
    }
    
    // Desktop smooth mouse follower with requestAnimationFrame for 60fps
    if (!isMobile) {
        // Update mouse position on move
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            mouseFollower.style.opacity = '1';
        });
        
        // Hide mouse follower when mouse leaves
        document.addEventListener('mouseleave', function() {
            mouseFollower.style.opacity = '0';
        });
        
        // Smooth animation function (runs at 60fps)
        function animateMouseFollower() {
            // Smooth easing calculation
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
            
            // Apply transform with translate3d for GPU acceleration
            mouseFollower.style.transform = `translate3d(${currentX - 150}px, ${currentY - 150}px, 0)`;
            
            // Request next frame
            requestAnimationFrame(animateMouseFollower);
        }
        
        // Start the animation loop
        animateMouseFollower();
    } 
    // Mobile gradient animation
    else {
        // Add a radial gradient that moves on touch
        document.addEventListener('touchmove', function(e) {
            if (e.touches && e.touches[0]) {
                const touchX = e.touches[0].clientX;
                const touchY = e.touches[0].clientY;
                
                // Update the gradients position
                const gradients = document.querySelectorAll('.gradient-circle');
                if (gradients.length > 0) {
                    gradients[0].style.transform = `translate(${touchX * 0.05}px, ${touchY * 0.05}px)`;
                    if (gradients.length > 1) {
                        gradients[1].style.transform = `translate(${-touchX * 0.03}px, ${-touchY * 0.03}px)`;
                    }
                }
            }
        });
    }
    
    // Copy discount code to clipboard
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(discountCode).then(function() {
                // Show toast message
                toast.classList.add('show');
                
                // Change button text temporarily
                const originalText = copyButton.querySelector('.button-text')?.textContent;
                if (copyButton.querySelector('.button-text')) {
                    copyButton.querySelector('.button-text').textContent = 'Copied!';
                }
                
                // Add success animation
                copyButton.classList.add('success');
                
                // Reset after delay
                setTimeout(function() {
                    toast.classList.remove('show');
                    if (copyButton.querySelector('.button-text') && originalText) {
                        copyButton.querySelector('.button-text').textContent = originalText;
                    }
                    copyButton.classList.remove('success');
                }, 2000);
            }).catch(function() {
                // Fallback for browsers that don't support clipboard API
                const tempInput = document.createElement('input');
                tempInput.value = discountCode;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                // Show toast
                toast.classList.add('show');
                
                // Reset after delay
                setTimeout(function() {
                    toast.classList.remove('show');
                }, 2000);
            });
        });
    }
    
    // Website button redirect with animation
    if (websiteButton) {
        websiteButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            websiteButton.classList.add('clicked');
            
            // Redirect after animation
            setTimeout(function() {
                window.location.href = 'https://www.instagram.com/thedynamicsphere/';
            }, 300);
        });
    }
    
    // Add hover effects for images
    const images = document.querySelectorAll('.step-image, .placeholder-image');
    images.forEach(image => {
        image.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Add touch events for mobile
        image.addEventListener('touchstart', function() {
            this.style.transform = 'scale(1.05)';
        }, {passive: true});
        
        image.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        }, {passive: true});
    });
});