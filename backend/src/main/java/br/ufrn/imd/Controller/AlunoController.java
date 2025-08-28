package br.ufrn.imd.Controller;


import br.ufrn.imd.DTO.AlunoRequestDTO;
import br.ufrn.imd.DTO.AlunoResponseDTO;
import br.ufrn.imd.Services.AlunoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/alunos") // 1. Convenção REST: use substantivos no plural para coleções de recursos
public class AlunoController {

    private final AlunoService alunoService;

    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    @PostMapping
    public ResponseEntity<AlunoResponseDTO> createAluno(@Valid @RequestBody AlunoRequestDTO data) {
        AlunoResponseDTO novoAluno = alunoService.createAluno(data);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoAluno);
    }

    @GetMapping
    public ResponseEntity<List<AlunoResponseDTO>> getAlunos() {
        return ResponseEntity.ok(alunoService.getAlunos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoResponseDTO> getAlunoById(@PathVariable UUID id) {
        return ResponseEntity.ok(alunoService.getAlunoById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoResponseDTO> updateAluno(@PathVariable UUID id, @Valid @RequestBody AlunoRequestDTO data) {
        AlunoResponseDTO alunoAtualizado = alunoService.updateAluno(id, data);
        return ResponseEntity.ok(alunoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAluno(@PathVariable UUID id) {
        alunoService.deleteAluno(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/nao-matriculados/turma/{turmaId}")
    public ResponseEntity<List<AlunoResponseDTO>> getAlunosNaoMatriculados(@PathVariable UUID turmaId) {
        List<AlunoResponseDTO> alunosDisponiveis = alunoService.findAlunosNaoMatriculadosNaTurma(turmaId);
        return ResponseEntity.ok(alunosDisponiveis);
    }
}