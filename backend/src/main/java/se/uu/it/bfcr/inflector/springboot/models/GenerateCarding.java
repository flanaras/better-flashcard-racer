package se.uu.it.bfcr.inflector.springboot.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import se.uu.it.bfcr.inflector.springboot.controllers.DeckController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by michael on 2017-02-13.
 * @author Philip Lanaras
 */
public class GenerateCarding {
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

    public Flashcard generateCard() {
        List<String> operandList = DeckController.mappingOperand(getOperand().get(0));
        List<Integer> randNumb;

        int randOperator = (int)(Math.random() * operandList.size());
        int total;

        if (operandList.get(randOperator).equals("/")) {
            boolean flag;

            do {
                randNumb = DeckController.randomNumber(getMin(), getMax());
                flag = false;

                if (randNumb.get(1) == 0) {
                    flag = true;
                } else {
                    if ((randNumb.get(0) % randNumb.get(1)) > 0) {
                        flag = true;
                    }
                }
            } while (flag);

        } else {
            randNumb = DeckController.randomNumber(getMin(), getMax());
        }

        total = DeckController.calculateTotal(randNumb.get(0), randNumb.get(1), operandList.get(randOperator));
        String problems = randNumb.get(0) + " " + operandList.get(randOperator) + " " + randNumb.get(1);
        return new Flashcard(999999, problems, String.valueOf(total));
    }

    public GenerateCarding()
    {

    }
}
