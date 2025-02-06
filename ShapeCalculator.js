class Shape {
    constructor() {
        this.lCalcBound = 0;
        this.uCalcBound = 9999999999.99;
    }

    outputValue(attribute, shape, value) {
        return `The ${attribute} of the ${shape} is ${Number(value).toFixed(2)}`;
    }
}

class Circle extends Shape {
    constructor() {
        super();
        this.PI = Math.PI;
    }

    calcArea(radius) {
        return this.PI * Math.pow(radius, 2);
    }

    calcCircumference(radius) {
        return 2.0 * this.PI * radius;
    }

    calculate(radius) {
        if (radius <= this.lCalcBound || radius >= this.uCalcBound) {
            throw new Error("Value must be between 0 and 9999999999.99");
        }
        return {
            area: this.calcArea(radius),
            circumference: this.calcCircumference(radius)
        };
    }
}

class Square extends Shape {
    constructor() {
        super();
    }

    calcArea(length) {
        return length * length;
    }

    calcPerimeter(length) {
        return length * 4.0;
    }

    calculate(length) {
        if (length <= this.lCalcBound || length >= this.uCalcBound) {
            throw new Error("Value must be between 0 and 9999999999.99");
        }
        return {
            area: this.calcArea(length),
            perimeter: this.calcPerimeter(length)
        };
    }
}

class Rectangle extends Shape {
    constructor() {
        super();
    }

    calcArea(length, width) {
        return length * width;
    }

    calcPerimeter(length, width) {
        return (length * 2.0) + (width * 2.0);
    }

    calculate(length, width) {
        if (length <= this.lCalcBound || length >= this.uCalcBound ||
            width <= this.lCalcBound || width >= this.uCalcBound) {
            throw new Error("Values must be between 0 and 9999999999.99");
        }
        return {
            area: this.calcArea(length, width),
            perimeter: this.calcPerimeter(length, width)
        };
    }
}

class ShapeCalculatorTerminal {
    constructor(containerId) {
        this.terminal = document.getElementById(containerId);
        this.output = this.terminal.querySelector('.terminal-output');
        this.input = this.terminal.querySelector('.terminal-input');
        this.circle = new Circle();
        this.square = new Square();
        this.rectangle = new Rectangle();
        this.setupEventListeners();
        this.showWelcomeMessage();
    }

    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => this.handleInput(e));
        this.terminal.addEventListener('click', () => this.input.focus());
    }

    showWelcomeMessage() {
        this.printOutput(`Welcome to Shape Calculator v1.0.0
Type 'help' to see available commands`, 'success');
    }

    handleInput(e) {
        if (e.key === 'Enter') {
            const command = this.input.value.trim();
            if (command) {
                this.executeCommand(command);
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
            case 'circle':
                this.calculateCircle(args[0]);
                break;
            case 'square':
                this.calculateSquare(args[0]);
                break;
            case 'rectangle':
                this.calculateRectangle(args[0], args[1]);
                break;
            case 'clear':
                this.clearTerminal();
                break;
            default:
                this.printOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
        }
    }

    showHelp() {
        this.printOutput(`
Available commands:
  circle <radius>           Calculate circle area and circumference
  square <length>          Calculate square area and perimeter
  rectangle <length> <width>  Calculate rectangle area and perimeter
  clear                    Clear the terminal
  help                     Show this help message
        `, 'success');
    }

    calculateCircle(radius) {
        if (!radius || isNaN(radius)) {
            this.printOutput('Please provide a valid radius value', 'error');
            return;
        }
        try {
            const results = this.circle.calculate(Number(radius));
            this.printOutput(this.circle.outputValue('Area', 'Circle', results.area), 'success');
            this.printOutput(this.circle.outputValue('Circumference', 'Circle', results.circumference), 'success');
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
            this.printOutput(this.square.outputValue('Area', 'Square', results.area), 'success');
            this.printOutput(this.square.outputValue('Perimeter', 'Square', results.perimeter), 'success');
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
            this.printOutput(this.rectangle.outputValue('Area', 'Rectangle', results.area), 'success');
            this.printOutput(this.rectangle.outputValue('Perimeter', 'Rectangle', results.perimeter), 'success');
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
}

// Initialize the terminal when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new ShapeCalculatorTerminal('shape-terminal');
}); 