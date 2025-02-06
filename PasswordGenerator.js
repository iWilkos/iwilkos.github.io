document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.getElementById('password-generator-cli');
    if (!terminal) return;

    const input = terminal.querySelector('.terminal-input');
    const output = terminal.querySelector('.terminal-output');
    let commandHistory = [];
    let historyIndex = -1;

    function generatePassword(length = 12) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
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
            addOutput('Generated password:');
            addOutput(password);
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