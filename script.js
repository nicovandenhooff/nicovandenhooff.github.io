// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const terminalContent = document.getElementById('terminal-content'); // Output area
    const typedCommand = document.getElementById('typed-command');      // Command line input
    const cursor = document.getElementById('cursor');                   // Blinking cursor

    // Define typing speeds and delays (in milliseconds)
    const typingSpeed = 100;    // Speed for typing each character
    const commandDelay = 500;   // Delay after command is typed before showing output
    const outputDelay = 1000;   // Delay after output is displayed before typing next command

    // Content for the "About Me" section
    const aboutMeContent = `
        <div class="section">
            <h2>About Me</h2>
            <p>Nico is a Machine Learning Engineer and Ironman-distance triathlete.</p>
        </div>
    `;

    // Content for the "Social Links" section
    const socialLinksContent = `
        <div class="section">
            <h2>Social Links</h2>
            <div class="social-links">
                <a href="https://www.linkedin.com/in/nicovandenhooff/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                    <i class="fab fa-linkedin fa-2x" aria-hidden="true"></i>
                </a>
                <a href="https://github.com/nicovandenhooff" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                    <i class="fab fa-github fa-2x" aria-hidden="true"></i>
                </a>
            </div>
        </div>
    `;

    // Commands and their corresponding outputs
    const commands = [
        {
            command: 'cat about_me.txt',
            output: aboutMeContent
        },
        {
            command: 'ls social_links/',
            output: socialLinksContent
        }
    ];

    // Initialize typing effect variables
    let commandIndex = 0;       // Index of the current command
    let charIndex = 0;          // Index of the current character in the command
    let isTypingCommand = true; // Flag to track if we're typing a command

    // Function to simulate typing effect
    function typeEffect() {
        if (commandIndex < commands.length) {
            if (isTypingCommand) {
                // Typing the command character by character
                if (charIndex < commands[commandIndex].command.length) {
                    // Append the next character to the typed command
                    typedCommand.textContent += commands[commandIndex].command.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeEffect, typingSpeed); // Continue typing
                } else {
                    // Command fully typed
                    isTypingCommand = false;
                    charIndex = 0;
                    setTimeout(typeEffect, commandDelay); // Wait before displaying output
                }
            } else {
                // Display the command's output
                terminalContent.innerHTML += commands[commandIndex].output;
                // Clear the typed command for the next command
                typedCommand.textContent = '';
                isTypingCommand = true;
                commandIndex++;
                setTimeout(typeEffect, outputDelay); // Wait before typing the next command
            }
        } else {
            // All commands executed; keep the cursor blinking
            cursor.style.display = 'inline-block';
        }
    }

    // Start the typing effect
    typeEffect();
});
