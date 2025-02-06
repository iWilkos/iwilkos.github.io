class Terminal {
    constructor(containerId) {
        this.terminal = document.getElementById(containerId);
        this.output = this.terminal.querySelector('.terminal-output');
        this.input = this.terminal.querySelector('.terminal-input');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.setupEventListeners();
        this.showWelcomeMessage();
    }

    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => this.handleInput(e));
        this.terminal.addEventListener('click', () => this.input.focus());
    }

    showWelcomeMessage() {
        this.printOutput(`Welcome to Password Generator CLI v1.0.0
Type 'help' to see available commands`, 'success');
    }

    handleInput(e) {
        if (e.key === 'Enter') {
            const command = this.input.value.trim();
            if (command) {
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
                this.executeCommand(command);
                this.input.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
        }
    }

    executeCommand(command) {
        this.printOutput(`guest@portfolio:~$ ${command}`);
        
        const [cmd, ...args] = command.toLowerCase().split(' ');
        
        switch (cmd) {
            case 'help':
                this.showHelp();
                break;
            case 'clear':
                this.clearTerminal();
                break;
            case 'generate':
                this.generatePassword(args[0]);
                break;
            case 'history':
                this.showHistory();
                break;
            default:
                this.printOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
        }
    }

    generatePassword(length = 16) {
        const words = ["begin", "cover", "wrong", "bread", "siege", "peace", "floor", "minor", "sheet", "grass"];
        const moreWords = ["paint", "state", "great", "ridge", "feast", "laser", "chalk", "angle", "story", "sweet"];
        const special = '!@#$%^&*';
        const numbers = '0123456789';
        
        const word = words[Math.floor(Math.random() * words.length)];
        const moreWord = moreWords[Math.floor(Math.random() * moreWords.length)];
        const specialChar = special[Math.floor(Math.random() * special.length)];
        const number = Math.floor(Math.random() * 1000);
        
        const password = `${word}${specialChar}${specialChar}${moreWord}${specialChar}${specialChar}${number}`;
        this.printOutput('Generated Password:', 'success');
        this.printOutput(password, 'success', true);
    }

    showHelp() {
        this.printOutput(`
Available commands:
  generate [length]  Generate a new password
  clear             Clear the terminal
  history           Show command history
  help              Show this help message
                `, 'success');
    }

    showHistory() {
        if (this.commandHistory.length === 0) {
            this.printOutput('No command history', 'error');
            return;
        }
        this.printOutput('Command history:', 'success');
        this.commandHistory.forEach((cmd, i) => {
            this.printOutput(`${i + 1}  ${cmd}`);
        });
    }

    clearTerminal() {
        this.output.innerHTML = '';
    }

    printOutput(text, className = '', copyable = false) {
        const line = document.createElement('div');
        line.className = `output-line ${className}`;
        line.textContent = text;
        
        if (copyable) {
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.textContent = 'Copy';
            copyButton.onclick = () => {
                navigator.clipboard.writeText(text);
                copyButton.textContent = 'Copied!';
                setTimeout(() => copyButton.textContent = 'Copy', 1000);
            };
            line.appendChild(copyButton);
        }
        
        this.output.appendChild(line);
        this.terminal.scrollTop = this.terminal.scrollHeight;
    }
}




// Initialize the terminal when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new Terminal('terminal');
}); 