package v1.carro;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;

/**
 * Created by tiago on 15/05/17.
 */
public class Util {
    public static ObjectNode createResponse(
            Object response, boolean ok) {

        ObjectNode result = Json.newObject();

        result.put("isSuccessfull", ok);
        if (response instanceof String) {
            result.put("body", (String) response);
        }
        else {
            result.put("body", (JsonNode) response);
        }

        return result;
    }
}
