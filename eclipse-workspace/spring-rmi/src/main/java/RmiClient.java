import java.rmi.Naming;

public class RmiClient {
    public static void main(String[] args) throws Exception {
        CalculatorService service = (CalculatorService) Naming.lookup("rmi://localhost:1099/CalculatorService");
        System.out.println("5 + 3 = " + service.add(5, 3));
        System.out.println("10 - 4 = " + service.subtract(10, 4));
    }
}