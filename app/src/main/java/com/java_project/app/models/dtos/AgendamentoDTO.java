package com.java_project.app.models.dtos;

import java.time.Instant;
import java.time.LocalDateTime;

public record AgendamentoDTO(String servico, LocalDateTime data, Long id_usuario) {
}
