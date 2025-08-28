package br.ufrn.imd.exceptions;

public class AlunoNaoMatriculadoException extends RuntimeException {
    public AlunoNaoMatriculadoException(String message) {
        super(message);
    }
}
