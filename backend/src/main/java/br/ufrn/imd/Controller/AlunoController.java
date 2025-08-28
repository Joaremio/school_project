package br.ufrn.imd.Controller;


import br.ufrn.imd.DTO.AlunoRequestDTO;
import br.ufrn.imd.Entitys.Aluno;
import br.ufrn.imd.Repositories.AlunoRepository;
import br.ufrn.imd.Services.AlunoService;
import br.ufrn.imd.Services.TurmaService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/aluno")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private TurmaService turmaService;

    @GetMapping()
    public ResponseEntity<List<Aluno>> getAlunos() {
        return ResponseEntity.ok(alunoService.getAlunos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> getAluno(@PathVariable UUID id) {
        return ResponseEntity.ok(alunoService.getAluno(id));
    }

    @PostMapping()
    public ResponseEntity<Aluno> createAluno(@Valid @RequestBody AlunoRequestDTO data) {
        Aluno aluno = alunoService.createAluno(data);
        return ResponseEntity.status(HttpStatus.CREATED).body(aluno);
    }

    @DeleteMapping("apagar/{id}")
    public ResponseEntity<?> deleteAluno(@PathVariable UUID id) {
        alunoService.deleteAluno(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> updateAluno(@PathVariable UUID id, @Valid @RequestBody AlunoRequestDTO data) {
        Aluno alunoAtualizado = alunoService.updateAluno(id, data);
        return ResponseEntity.ok(alunoAtualizado);
    }

    @GetMapping("/nao-enturmados/{turmaId}")
    public ResponseEntity<List<Aluno>> getAlunosNaoEnturmados(@PathVariable UUID turmaId) {
        List<Aluno> alunosDisponiveis = alunoService.findAlunosNaoEnturmados(turmaId);
        return ResponseEntity.ok(alunosDisponiveis);
    }


}

