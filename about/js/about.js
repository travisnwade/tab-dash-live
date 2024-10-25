// Modal
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuModal = document.createElement('div');
    const menuContainer = document.createElement('div');

    // Set up modal structure
    menuModal.id = 'menu-modal';
    menuModal.style.display = 'none'; // Ensure the modal is hidden on page load

    // Add the instruction text
    const closeInstruction = document.createElement('p');
    closeInstruction.id = 'close-instruction';
    closeInstruction.textContent = '(click outside the menu to close)';
    menuModal.appendChild(closeInstruction);

    menuContainer.id = 'menu-container';
    menuModal.appendChild(menuContainer);
    document.body.appendChild(menuModal);

    // Add menu items with links
    const menuItems = [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about/' }
    ];

    menuItems.forEach(item => {
        const menuItem = document.createElement('li');
        menuItem.classList.add('menu-item');

        const menuLink = document.createElement('a');
        menuLink.href = item.link;
        menuLink.textContent = item.name;
        menuLink.style.color = 'inherit'; // Ensure the link color matches the menu style
        menuLink.style.textDecoration = 'none'; // Remove underline from link

        menuItem.appendChild(menuLink);
        menuContainer.appendChild(menuItem);
    });

    // Toggle menu
    menuToggle.addEventListener('click', () => {
        if (menuModal.style.display === 'none' || menuModal.style.display === '') {
            menuModal.style.display = 'flex'; // Show the modal using flexbox
        } else {
            menuModal.style.display = 'none'; // Hide the modal
        }
    });

    // Close menu if clicking outside the menu container
    menuModal.addEventListener('click', (event) => {
        if (!menuContainer.contains(event.target)) {
            menuModal.style.display = 'none';
        }
    });
});

// Home button
document.addEventListener('DOMContentLoaded', () => {
    // Existing code for menu and other features

    // Handle Home button click
    const homeLink = document.getElementById('home-link');
    const audio = new Audio('sounds/error.mp3');
    const homeIcon = homeLink.querySelector('i');

    homeLink.addEventListener('click', () => {
        homeLink.classList.add('spin'); // Add spinning animation to icon
        homeLink.textContent = '...'; // Change text to "..."
        homeLink.prepend(homeIcon); // Ensure the icon stays before the text

        audio.play(); // Play the audio

        audio.onended = () => {
            homeLink.classList.remove('spin'); // Remove spinning animation
            homeLink.textContent = 'Home'; // Change text back to "Home"
            homeLink.prepend(homeIcon); // Ensure the icon stays before the text
            window.location.href = '/'; // Redirect to home page
        };
    });
});