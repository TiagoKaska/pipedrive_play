package v1.carro;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by tiago on 15/05/17.
 */
public class CarroStore {

    private static CarroStore instance;
    private Map<Integer, Carro> carros = new HashMap<>();

    public static CarroStore getInstance() {
        if (instance == null) {
            instance = new CarroStore();
        }
        return instance;
    }

    public Carro addCarro(Carro carro) {
        int id = carros.size();
        carro.setId(id);
        carros.put(id, carro);
        return carro;
    }

    public Carro getCarro(int id) {
        return carros.get(id);
    }

    public Set<Carro> getAllCarros() {
        return new HashSet<>(carros.values());
    }

    public Carro updateCarro(Carro carro) {
        int id = carro.getId();
        if (carros.containsKey(id)) {
            carros.put(id, carro);
            return carro;
        }
        return null;
    }

    public boolean deleteCarro(int id) {
        return carros.remove(id) != null;
    }
}
