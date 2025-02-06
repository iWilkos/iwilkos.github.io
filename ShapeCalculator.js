class Shape {
    constructor(name) {
        this.name = name;
    }

    outputValue(type, shape, value, unit) {
        return `${shape} ${type}: ${value.toFixed(2)} ${unit}`;
    }

}

class Circle extends Shape {
    constructor() {
        super('Circle');
    }

    calculate(radius) {
        if (radius <= 0) {
            throw new Error('Radius must be greater than 0');
        }
        return {
            area: Math.PI * radius * radius,
            circumference: 2 * Math.PI * radius
        };
    }
}

class Square extends Shape {
    constructor() {
        super('Square');
    }

    calculate(length) {
        if (length <= 0) {
            throw new Error('Length must be greater than 0');
        }
        return {
            area: length * length,
            perimeter: 4 * length
        };
    }
}

class Rectangle extends Shape {
    constructor() {
        super('Rectangle');
    }

    calculate(length, width) {
        if (length <= 0 || width <= 0) {
            throw new Error('Length and width must be greater than 0');
        }
        return {
            area: length * width,
            perimeter: 2 * (length + width)
        };
    }
}

class ShapeCalculatorTerminal {
    constructor(terminalId) {
        this.terminal = document.getElementById(terminalId);
        this.output = this.terminal.querySelector('.terminal-output');
        this.input = this.terminal.querySelector('.terminal-input');
        this.commandHistory = [];
        this.historyIndex = -1;

        this.circle = new Circle();
        this.square = new Square();
        this.rectangle = new Rectangle();

        this.setupEventListeners();
        this.printWelcomeMessage();
    }

    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    handleKeydown(e) {
        if (e.key === 'Enter') {
            const command = this.input.value;
            this.executeCommand(command);
            this.commandHistory.push(command);
            this.historyIndex = this.commandHistory.length;
            this.input.value = '';
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
        const parts = command.toLowerCase().trim().split(' ');
        
        if (parts[0] === 'help') {
            this.showHelp();
        } else if (parts[0] === 'calculate') {
            this.handleCalculation(parts.slice(1));
        } else if (parts[0] === 'clear') {
            this.clearTerminal();
        } else if (parts[0] !== '') {
            this.printOutput(`Command not found: ${parts[0]}`, 'error');
        }
    }

    handleCalculation(args) {
        if (args.length < 2) {
            this.printOutput('Invalid command format. Type "help" for usage.', 'error');
            return;
        }

        const shape = args[0];
        const params = args.slice(1).map(Number);

        if (params.some(isNaN)) {
            this.printOutput('Invalid numbers provided.', 'error');
            return;
        }

        switch (shape) {
            case 'circle':
                this.calculateCircle(params[0]);
                break;
            case 'square':
                this.calculateSquare(params[0]);
                break;
            case 'rectangle':
                this.calculateRectangle(params[0], params[1]);
                break;
            default:
                this.printOutput(`Unknown shape: ${shape}`, 'error');
        }
    }

    showHelp() {
        this.printOutput('Available commands:');
        this.printOutput('  calculate circle <radius> - Calculate circle area and circumference');
        this.printOutput('  calculate square <side> - Calculate square area and perimeter');
        this.printOutput('  calculate rectangle <width> <height> - Calculate rectangle area and perimeter');
        this.printOutput('  clear - Clear the terminal');
        this.printOutput('  help - Show this help message');
    }

    calculateCircle(radius) {
        if (!radius || isNaN(radius)) {
            this.printOutput('Please provide a valid radius value', 'error');
            return;
        }
        try {
            const results = this.circle.calculate(Number(radius));
            this.printOutput(this.circle.outputValue('Area', 'Circle', results.area, 'cm²'), 'success');
            this.printOutput(this.circle.outputValue('Circumference', 'Circle', results.circumference, 'cm'), 'success');
        } catch (error) {
            this.printOutput(error.message, 'error');
        }
    }

    calculateSquare(length) {
        if (!length || isNaN(length)) {
            this.printOutput('Please provide a valid length value', 'error');
            return;
        }
        try {
            const results = this.square.calculate(Number(length));
            this.printOutput(this.square.outputValue('Area', 'Square', results.area, 'cm²'), 'success');
            this.printOutput(this.square.outputValue('Perimeter', 'Square', results.perimeter, 'cm'), 'success');
        } catch (error) {
            this.printOutput(error.message, 'error');
        }
    }

    calculateRectangle(length, width) {
        if (!length || !width || isNaN(length) || isNaN(width)) {
            this.printOutput('Please provide valid length and width values', 'error');
            return;
        }
        try {
            const results = this.rectangle.calculate(Number(length), Number(width));
            this.printOutput(this.rectangle.outputValue('Area', 'Rectangle', results.area, 'cm²'), 'success');
            this.printOutput(this.rectangle.outputValue('Perimeter', 'Rectangle', results.perimeter, 'cm'), 'success');
        } catch (error) {
            this.printOutput(error.message, 'error');
        }
    }

    clearTerminal() {
        this.output.innerHTML = '';
    }

    printOutput(text, className = '') {
        const line = document.createElement('div');
        line.className = `output-line ${className}`;
        line.textContent = text;
        this.output.appendChild(line);
        this.terminal.scrollTop = this.terminal.scrollHeight;
    }

    printWelcomeMessage() {
        this.printOutput('Shape Calculator CLI');
        this.printOutput('Type "help" for available commands');
    }
}

// Initialize the terminal when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new ShapeCalculatorTerminal('shape-terminal');
}); 