package se.uu.it.bfcr.inflector.springboot.models;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by michael on 2017-02-13.
 */
public class OperandGenerate {

    @JsonProperty
    private boolean minus;
    @JsonProperty
    private boolean add;
    @JsonProperty
    private boolean multi;
    @JsonProperty
    private boolean div;

    public boolean isMinus() {
        return minus;
    }

    public void setMinus(boolean minus) {
        this.minus = minus;
    }

    public boolean isAdd() {
        return add;
    }

    public void setAdd(boolean add) {
        this.add = add;
    }

    public boolean isMulti() {
        return multi;
    }

    public void setMulti(boolean multi) {
        this.multi = multi;
    }

    public boolean isDiv() {
        return div;
    }

    public void setDiv(boolean div) {
        this.div = div;
    }

    public OperandGenerate()
    {

    }

}
