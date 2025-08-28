package br.ufrn.imd.Controller;

import br.ufrn.imd.DTO.MatriculaRequestDTO;
import br.ufrn.imd.DTO.MatriculaResponseDTO;
import br.ufrn.imd.DTO.TurmaRequestDTO;
import br.ufrn.imd.DTO.TurmaResponseDTO;
import br.ufrn.imd.Services.TurmaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RequestMapping("/turmas")
@RestController
public class TurmaController {

    private final TurmaService turmaService;

    public TurmaController(TurmaService turmaService) {
        this.turmaService = turmaService;
    }

    @PostMapping
    public ResponseEntity<TurmaResponseDTO> criarTurma(@RequestBody TurmaRequestDTO turma) {
        TurmaResponseDTO novaTurma = turmaService.createTurma(turma);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaTurma);
    }

    @GetMapping
    public ResponseEntity<List<TurmaResponseDTO>> getTurmas() {
        return ResponseEntity.ok(turmaService.getTurmas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TurmaResponseDTO> getTurmaById(@PathVariable UUID id) {
        return ResponseEntity.ok(turmaService.getTurma(id));
    }

    @GetMapping("/aluno/{alunoId}")
    public ResponseEntity<List<TurmaResponseDTO>> getTurmasByAluno(@PathVariable UUID alunoId) {
        List<TurmaResponseDTO> turmas = turmaService.getTurmasByAluno(alunoId);
        return ResponseEntity.ok(turmas);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTurma(@PathVariable UUID id) {
        turmaService.deleteTurma(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/matricular") // Novo endpoint para criar uma matrícula
    public ResponseEntity<MatriculaResponseDTO> matricularAluno(@RequestBody MatriculaRequestDTO data) {
        MatriculaResponseDTO novaMatricula = turmaService.matricularAluno(data);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaMatricula);
    }

    @DeleteMapping("/matricula/aluno/{alunoId}/turma/{turmaId}") // Novo endpoint para cancelar uma matrícula
    public ResponseEntity<Void> cancelarMatricula(@PathVariable UUID alunoId, @PathVariable UUID turmaId) {
        turmaService.cancelarMatricula(alunoId, turmaId);
        return ResponseEntity.noContent().build();
    }
}