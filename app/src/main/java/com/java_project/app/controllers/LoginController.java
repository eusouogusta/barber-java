package com.java_project.app.controllers;

import com.java_project.app.models.Login;
import com.java_project.app.models.Usuario;
import com.java_project.app.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@CrossOrigin("*")
public class LoginController {

    @Autowired
    UsuarioRepository repository;

    @PostMapping("/logar")
    public ResponseEntity<Object> realizarAutenticacao(@RequestBody Login login) {
        Usuario usuario = repository.findByEmail(login.getEmail());

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "esse email não esta cadastrado"));
        }

        if (!login.getSenha().equals(usuario.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("message", "senha inválida"));
        }

        // Retorna uma resposta com a mensagem de sucesso e o ID do usuário
        return ResponseEntity.status(HttpStatus.OK).body(Collections.singletonMap("id", usuario.getId()));
    }

}
