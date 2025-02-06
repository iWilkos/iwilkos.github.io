document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.getElementById('password-generator-cli');
    if (!terminal) return;

    const input = terminal.querySelector('.terminal-input');
    const output = terminal.querySelector('.terminal-output');
    let commandHistory = [];
    let historyIndex = -1;

    function generatePassword(length = 16) {
        const words = ["begin", "cover", "wrong", "bread", "siege", "peace", "floor", "minor", "sheet", "grass"];
        const moreWords = ["paint", "state", "great", "ridge", "feast", "laser", "chalk", "angle", "story", "sweet"];
        const special = '!@#$%^&*';
        const numbers = '0123456789';
        
        const word = words[Math.floor(Math.random() * words.length)];
        const moreWord = moreWords[Math.floor(Math.random() * moreWords.length)];
        const specialChar = special[Math.floor(Math.random() * special.length)];
        const number = Math.floor(Math.random() * 1000);
        
        const password = `${word}${specialChar}${specialChar}${moreWord}${specialChar}${specialChar}${number}`;
        return password;
    }

    function addOutput(text, isCommand = false) {
        const line = document.createElement('div');
        line.className = isCommand ? 'command-line' : 'output-line';
        line.textContent = isCommand ? `guest@portfolio:~$ ${text}` : text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    function processCommand(command) {
        const cmd = command.toLowerCase().trim();
        
        if (cmd === 'help') {
            addOutput('Available commands:');
            addOutput('  generate - Generate a random password');
            addOutput('  clear - Clear the terminal');
            addOutput('  help - Show this help message');
        } else if (cmd === 'generate') {
            const password = generatePassword();
            addOutput('Generated Password:', true);
            const line = document.createElement('div');
            line.className = 'output-line';
            line.textContent = password;
            
            // Add copy button functionality
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.textContent = 'Copy';
            copyButton.onclick = () => {
                navigator.clipboard.writeText(password);
                copyButton.textContent = 'Copied!';
                setTimeout(() => copyButton.textContent = 'Copy', 1000);
            };
            line.appendChild(copyButton);
            
            output.appendChild(line);
        } else if (cmd === 'clear') {
            output.innerHTML = '';
        } else if (cmd !== '') {
            addOutput(`Command not found: ${command}`);
        }
    }

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value;
            addOutput(command, true);
            processCommand(command);
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            this.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                this.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                this.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                this.value = '';
            }
        }
    });

    // Initial message
    addOutput('Password Generator CLI');
    addOutput('Type "help" for available commands');
}); 