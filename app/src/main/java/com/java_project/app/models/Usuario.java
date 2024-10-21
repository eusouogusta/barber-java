package com.java_project.app.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false, length = 30, unique = true)
    private String nome;
    @Email(message = "email incorreto")
    @Column(nullable = false, length = 40, unique = true)
    private String email;
    @NotNull
    @Column(nullable = false, length = 15)
    private String senha;
    @Transient
    private String repeticaoSenha ;

    //ASSOCIACAO
    @OneToOne(mappedBy = "usuario")
    private Agendamento agendamento;
}
