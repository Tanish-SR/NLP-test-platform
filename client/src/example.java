public class LoginSystem {
    public static void main(String[] args) {
        String username = "admin";
        String password = "1234";

        Scanner input = new Scanner(System.in); // Missing import

        System.out.println("Enter username: ");
        String userInput = input.nextLine();

        System.out.println("Enter password: ");
        String passInput = input.nextLine();

        if (userInput = username && passInput == password) { // Assignment instead of comparison
            System.out.println("Login success!");
        } else
            System.out.println("Login failed!")
        } // Extra closing brace

        input.close(); // Might not reach here due to syntax error
    }
}
