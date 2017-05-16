package v1.carro;


import play.data.validation.Constraints;
import play.data.validation.ValidationError;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by tiago on 15/05/17.
 */
public class Carro  {
    private int id;
    @Constraints.Required
    private int idPerson;
    private String modelo;
    private String ano;
    private String cor;

    public List<ValidationError> validate() {

        List<ValidationError> errors = new ArrayList<ValidationError>();

        if(cor == null){
            errors.add(new ValidationError("cor", "cor required"));
        }

        if(! (cor.equalsIgnoreCase("verde") ||
                cor.equalsIgnoreCase("branco") ||
                cor.equalsIgnoreCase("preto"))
                )
        {
            errors.add(new ValidationError("cor", "cor invalid"));

        }

        return errors.isEmpty() ? null : errors;
    }


    public Carro(){}
    public Carro(int id, int idPerson, String modelo, String ano, String cor) {
        this.id = id;
        this.idPerson = idPerson;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
    }




    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdPerson() {
        return idPerson;
    }

    public void setIdPerson(int idPerson) {
        this.idPerson = idPerson;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getAno() {
        return ano;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }
}
