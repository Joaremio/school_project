package br.ufrn.imd;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Turno {
    MATUTINO("MATUTINO"),
    VESPERTINO("VESPERTINO"),
    NOTURNO("NOTURNO");

    private final String value;

    Turno(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static Turno fromValue(String value) {
        for (Turno t : values()) {
            if (t.value.equalsIgnoreCase(value)) {
                return t;
            }
        }
        throw new IllegalArgumentException("Turno inválido: " + value);
    }
}


