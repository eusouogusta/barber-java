package com.java_project.app.controllers;

import com.java_project.app.models.Agendamento;
import com.java_project.app.models.Usuario;
import com.java_project.app.models.dtos.AgendamentoDTO;
import com.java_project.app.repositories.AgendamentoRepository;
import com.java_project.app.repositories.UsuarioRepository;
import com.java_project.app.services.UsuarioService;
import org.springframework.beans.BeanUtils;
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
    public ResponseEntity<Agendamento> agendarServico(@RequestBody AgendamentoDTO agendamento){
        System.out.println("agendamento recebido " + agendamento);
        Agendamento a = new Agendamento();
        BeanUtils.copyProperties(agendamento, a);
        Optional<Usuario> usuarioBuscado = usuarioRepository.findById(agendamento.id_usuario());
        a.setUsuario(usuarioBuscado.get());

       return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(a));
    }
}
