package com.java_project.app.controllers;

import com.java_project.app.models.Agendamento;
import com.java_project.app.models.Usuario;
import com.java_project.app.repositories.AgendamentoRepository;
import com.java_project.app.repositories.UsuarioRepository;
import com.java_project.app.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@CrossOrigin("*")
public class AgendamentoController {

    @Autowired
    AgendamentoRepository repository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @PostMapping("/agendar")
    public ResponseEntity<Agendamento> agendarServico(@RequestBody Agendamento agendamento){
        System.out.println("agendamento recebido " + agendamento);
        Usuario u = usuarioRepository.findById(agendamento.getUsuario().getId()).orElseThrow(() -> new RuntimeException("Usuario não encontrado"));
        agendamento.setUsuario(u);

       return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(agendamento));
    }
}
