var Calculator = /** @class */ (function () {
    function Calculator(previosOperandTextElement, currentOperandTextElement) {
        this.previosOperandTextElement = previosOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    Calculator.prototype.clear = function () {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    };
    Calculator.prototype.appendNumber = function (number) {
        // Prevents putting multiple periods
        if (number === '.' && this.currentOperand.includes('.'))
            return;
        this.currentOperand = this.currentOperand + number;
    };
    Calculator.prototype.chooseOperation = function (operation) {
        if (this.currentOperand === '')
            return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    };
    Calculator.prototype.compute = function () {
        var computation;
        var prev = parseFloat(this.previousOperand);
        var current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current))
            return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString();
        this.operation = null;
        this.previousOperand = '';
    };
    Calculator.prototype.updateDisplay = function () {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previosOperandTextElement.innerText =
                this.previousOperand + " " + this.operation;
        }
        else {
            this.previosOperandTextElement.innerText = '';
        }
    };
    return Calculator;
}());
var numberButtons = document.querySelectorAll('[data-number]');
var operationButtons = document.querySelectorAll('[data-operation]');
var clearButton = document.querySelector('[data-clear]');
var equalsButton = document.querySelector('[data-equals]');
var previosOperandTextElement = document.querySelector('.previos-operand');
var currentOperandTextElement = document.querySelector('.current-operand');
var calculator = new Calculator(previosOperandTextElement, currentOperandTextElement);
numberButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});
operationButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});
equalsButton.addEventListener('click', function (button) {
    calculator.compute();
    calculator.updateDisplay();
});
clearButton.addEventListener('click', function (button) {
    calculator.clear();
    calculator.updateDisplay();
});
