package br.ufrn.imd.Controller;

import br.ufrn.imd.DTO.TurmaRequestDTO;
import br.ufrn.imd.Entitys.Turma;
import br.ufrn.imd.Repositories.TurmaRepository;
import br.ufrn.imd.Services.TurmaService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/turma")
public class TurmaController {

    @Autowired
    private TurmaRepository turmaRepository;
    @Autowired
    private TurmaService turmaService;

    @PostMapping
    public ResponseEntity<Turma> criarTurma(@RequestBody TurmaRequestDTO turma) {
        Turma novaTurma = turmaService.createTurma(turma);
        return new ResponseEntity<>(novaTurma, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Turma>> getTurmas(){
        return ResponseEntity.ok(turmaService.getTurmas());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTurma (@PathVariable UUID id){
        turmaService.deleteTurma(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/adicionar/{alunoId}/{turmaId}")
    public ResponseEntity<Turma> adicionarAluno(@PathVariable UUID alunoId, @PathVariable UUID turmaId){
        return ResponseEntity.ok().body(turmaService.addAluno(alunoId, turmaId));
    }

    @DeleteMapping("/remover/{alunoId}/{turmaId}")
    public ResponseEntity<?> deleteAluno(@PathVariable UUID alunoId, @PathVariable UUID turmaId){
        turmaService.RemoveAluno(alunoId,turmaId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/porAluno/{id}")
    public ResponseEntity<List<Turma>> getTurmasByAluno(@PathVariable UUID id){
        List<Turma> turmas = turmaService.getTurmasByAluno(id);
        return ResponseEntity.ok(turmas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Turma> getTurmaById(@PathVariable UUID id){
        return ResponseEntity.ok().body(turmaService.getTurma(id));
    }


}
