package com.java_project.app.controllers;

import com.java_project.app.exceptions.UsuarioEmaileSenhaNulaouVaziaException;
import com.java_project.app.exceptions.UsuarioOuEmailExistenteException;
import com.java_project.app.models.Usuario;
import com.java_project.app.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    UsuarioService service;

    @PostMapping("/register")
    public ResponseEntity<Object> criarUsuario(@Valid @RequestBody Usuario usuario){
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(service.criarUsuario(usuario));
        }
        catch (UsuarioEmaileSenhaNulaouVaziaException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", e.getMessage()));
        }
        catch (UsuarioOuEmailExistenteException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", e.getMessage()));
        }
    }

}
