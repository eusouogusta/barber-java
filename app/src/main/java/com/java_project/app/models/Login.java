package com.java_project.app.models;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Login {
    @NotBlank
    @Email(message = "Email inválido")
    private String email;
    @NotBlank
    private String senha;
}
