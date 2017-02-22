package se.uu.it.bfcr.inflector.springboot.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;

/**
 * Created by michael on 2017-02-13.
 */
public class generateCarding {
    @JsonProperty
    private int min;
    @JsonProperty
    private int max;
    @JsonProperty
    private int numberSolution;
    @JsonProperty
    private ArrayList<OperandGenerate> operators = new ArrayList<OperandGenerate>();

    public int getMin() {
        return min;
    }

    public void setMin(int min) {
        this.min = min;
    }

    public int getMax() {
        return max;
    }

    public void setMax(int max) {
        this.max = max;
    }

    public int getNumberSolution() {
        return numberSolution;
    }

    public void setNumberSolution(int numberSolution) {
        this.numberSolution = numberSolution;
    }

    public ArrayList<OperandGenerate> getOperand() {
        return operators;
    }

    public void setOperand(ArrayList<OperandGenerate> operand) {
        this.operators = operand;
    }

    public generateCarding()
    {

    }
}
