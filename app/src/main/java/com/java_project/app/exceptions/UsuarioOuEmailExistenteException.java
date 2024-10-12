package com.java_project.app.exceptions;

public class UsuarioOuEmailExistenteException extends RuntimeException{

    public UsuarioOuEmailExistenteException(String msg){
        super(msg);
    }
}
