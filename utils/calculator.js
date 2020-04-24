module.exports = {
    calculator: function(num1, operator, num2){
        if(isNaN(num1)) return 'Number 1 is not a number';
        if(isNaN(num2)) return 'Number 2 is not a number';
        switch(operator){
            case "+":
                return parseInt(num1) + parseInt(num2);
                break;
            case "-":
                return num1 - num2;
                break;
            case "*":
                return num1 * num2;
                break;
            case "/":
                return (num1 / num2).toFixed(2);
                break;
            default:
                return "Enter a valid operator (+|-|*|/)";
                break;
        }
    }
}