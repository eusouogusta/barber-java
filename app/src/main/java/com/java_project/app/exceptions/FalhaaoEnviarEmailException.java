package com.java_project.app.exceptions;

public class FalhaaoEnviarEmailException extends RuntimeException{

    public FalhaaoEnviarEmailException(String msg){
        super(msg);
    }
}
