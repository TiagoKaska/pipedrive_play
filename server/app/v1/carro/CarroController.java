package v1.carro;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import play.data.Form;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.Set;

/**
 * Created by tiago on 15/05/17.
 */
public class CarroController extends Controller{

    public Result list() {
        Set<Carro> result = CarroStore.getInstance().getAllCarros();
        ObjectMapper mapper = new ObjectMapper();

        JsonNode jsonData = mapper.convertValue(result, JsonNode.class);
        return ok(Util.createResponse(jsonData, true));
    }

    public Result show(int id) {
        Carro carro = CarroStore.getInstance().getCarro(id);
        if (carro == null) {
            return notFound(Util.createResponse(
                    "Carro with id:" + id + " not found", false));
        }
        JsonNode jsonObjects = Json.toJson(carro);
        return ok(Util.createResponse(jsonObjects, true));
    }

    public Result create() {
        JsonNode json = request().body().asJson();
        if (json == null) {
            return badRequest(Util.createResponse("Expecting Json data", false));
        }
        Form<Carro> filledForm = Form.form(Carro.class).bindFromRequest();


        if (filledForm.hasErrors()) {
            return badRequest(Util.createResponse(filledForm.errors().toString(), false));
        }

        Carro carro = CarroStore.getInstance().addCarro(Json.fromJson(json, Carro.class));
        JsonNode jsonObject = Json.toJson(carro);
        return created(Util.createResponse(jsonObject, true));
    }

    public Result update(int id) {
        JsonNode json = request().body().asJson();
        if (json == null){
            return badRequest(Util.createResponse(
                    "Expecting Json data", false));
        }
        Carro carro = CarroStore.getInstance().updateCarro(
                (Carro) Json.fromJson(json, Carro.class));
        if (carro == null) {
            return notFound(Util.createResponse(
                    "Carro not found", false));
        }

        JsonNode jsonObject = Json.toJson(carro);
        return ok(Util.createResponse(jsonObject, true));
    }

    public Result delete(int id) {
        boolean status = CarroStore.getInstance().deleteCarro(id);
        if (!status) {
            return notFound(Util.createResponse(
                    "Carro with id:" + id + " not found", false));
        }
        return ok(Util.createResponse(
                "Carro with id:" + id + " deleted", true));
    }

}
