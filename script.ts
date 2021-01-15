class Calculator{

    previosOperandTextElement: HTMLInputElement;
    currentOperandTextElement: HTMLInputElement;
    currentOperand: string;
    previousOperand: string;
    operation: any;

    constructor(previosOperandTextElement:HTMLInputElement,currentOperandTextElement:HTMLInputElement){
        this.previosOperandTextElement = previosOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    appendNumber(number:string){
        // Prevents putting multiple periods
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand + number  
    }

    chooseOperation(operation:string){
        if(this.currentOperand ==='') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation:number
        const prev: number = parseFloat(this.previousOperand)
        const current: number = parseFloat(this.currentOperand)

        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand  = computation.toString()
        this.operation = null
        this.previousOperand = ''
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        if(this.operation != null){
            this.previosOperandTextElement.innerText =
                `${this.previousOperand} ${this.operation}`
        }else{
            this.previosOperandTextElement.innerText =''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]') as NodeListOf<HTMLInputElement>
const operationButtons = document.querySelectorAll('[data-operation]') as NodeListOf<HTMLInputElement>
const clearButton = document.querySelector('[data-clear]') as HTMLInputElement
const equalsButton = document.querySelector('[data-equals]') as HTMLInputElement
const previosOperandTextElement = document.querySelector('.previos-operand') as HTMLInputElement
const currentOperandTextElement = document.querySelector('.current-operand') as HTMLInputElement

const calculator = new Calculator(previosOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',button =>{
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click',button =>{
    calculator.clear()
    calculator.updateDisplay()
})