package com.java_project.app.services;

import com.java_project.app.exceptions.UsuarioEmaileSenhaNulaouVaziaException;
import com.java_project.app.exceptions.UsuarioOuEmailExistenteException;
import com.java_project.app.models.Usuario;
import com.java_project.app.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository repository;

    @Autowired
    EmailService emailService;

    private static final String EMAIL_REGEX = "^[\\w-\\.]+@[\\w-]+\\.[a-zA-Z]{2,}$";
    private static final Pattern pattern = Pattern.compile(EMAIL_REGEX);


    public Usuario criarUsuario(Usuario usuario){
        if(usuario.getNome() == null || usuario.getNome().isEmpty()){
            throw new UsuarioEmaileSenhaNulaouVaziaException("usuario não pode ser nulo ou vazio");
        }
        var n = repository.findByNome(usuario.getNome());
        if(n != null){
            throw new UsuarioOuEmailExistenteException("Esse nome já existe em nossa base de dados");
        }
        if(usuario.getEmail() == null || !pattern.matcher(usuario.getEmail()).matches()){
            throw new UsuarioEmaileSenhaNulaouVaziaException("email inválido");
        }
        var e = repository.findByEmail(usuario.getEmail());
        if(e != null){
            throw new UsuarioOuEmailExistenteException("Esse email já existe em nossa base de dados");
        }
        if(usuario.getSenha() == null || usuario.getSenha().isEmpty()){
            throw new UsuarioEmaileSenhaNulaouVaziaException("senha não pode ser nula ou vazia");
        }
        if(!usuario.getRepeticaoSenha().equals(usuario.getSenha())){
            throw new UsuarioEmaileSenhaNulaouVaziaException("você inseriu uma senha incorreta");
        }

        emailService.enviarEmail(usuario.getEmail(), "Cadastro Realizado", "Olá, " + usuario.getNome() + ", você foi cadastrado com sucesso em nosso sistema.");

        return repository.save(usuario);


    }
}
