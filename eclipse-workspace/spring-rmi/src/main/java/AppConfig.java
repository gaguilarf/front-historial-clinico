import java.rmi.RemoteException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.remoting.rmi.RmiServiceExporter;

@SuppressWarnings("deprecation")
@Configuration
public class AppConfig {
	@Bean
    public RmiServiceExporter rmiServiceExporter() throws RemoteException {
        RmiServiceExporter exporter = new RmiServiceExporter();
        exporter.setServiceName("CalculatorService");
        exporter.setServiceInterface(CalculatorService.class);
        exporter.setService(new CalculatorServiceImpl());
        return exporter;
    }
}
