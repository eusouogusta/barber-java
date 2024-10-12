package com.java_project.app.repositories;

import com.java_project.app.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    public Usuario findByNome(String nome);
    public Usuario findByEmail(String nome);
}
