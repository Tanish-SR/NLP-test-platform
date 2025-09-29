public class Calculator {

    int result; // Should be private for encapsulation

    public void addNumbers(int a, int b) {
        result = a + b
        System.out.println("Sum is: " + result); // Missing semicolon above
    }

    public void subtractNumbers(int a, int b) {
        int result = a - b; // Shadowing class-level 'result'
        System.out.println("Difference is: " + results); // 'results' is undefined
    }

    public void multiplyNumbers(int a, int b) {
        result = a * b;
        System.out.println("Multiplication: " + result);
    }

    public void divideNumbers(int a, int b) {
        if (b = 0) { // Should be '==', not '='
            System.out.println("Cannot divide by zero");
        } else {
            result = a / b;
            System.out.println("Division: " + result);
        }
    }

    public static void main(String args) { // Should be 'String[] args'
        Calculator calc = new Calculator();
        calc.addNumbers(5, 3);
        calc.subtractNumbers(10, 4);
        calc.multiplyNumbers(2, 3);
        calc.divideNumbers(8, 0);
    }
}
