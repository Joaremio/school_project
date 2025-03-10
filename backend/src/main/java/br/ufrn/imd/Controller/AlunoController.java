package br.ufrn.imd.Controller;


import br.ufrn.imd.DTO.AlunoRequestDTO;
import br.ufrn.imd.Entitys.Aluno;
import br.ufrn.imd.Repositories.AlunoRepository;
import br.ufrn.imd.Services.AlunoService;
import br.ufrn.imd.Services.TurmaService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/sistema")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private TurmaService turmaService;

    @GetMapping("/alunos")
    public ResponseEntity<List<Aluno>> getAlunos() {
        List<Aluno> alunos = alunoService.getAlunos();
        return ResponseEntity.status(HttpStatus.OK).body(alunos);
    }

    @GetMapping("/aluno/{id}")
    public ResponseEntity<?> getAlunoById(@PathVariable UUID id) {
        return alunoService.getAluno(id)
                .<ResponseEntity<?>>map(aluno -> ResponseEntity.ok(aluno)) // Força o tipo genérico
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno não encontrado!"));
    }

    @PostMapping("/aluno")
    public ResponseEntity<Aluno> createAluno(@RequestBody  AlunoRequestDTO data) {
        Aluno aluno = alunoService.createAluno(data);
        return ResponseEntity.status(HttpStatus.CREATED).body(aluno);
    }

    @DeleteMapping("/aluno/apagar/{id}")
    public ResponseEntity<?> deleteAluno(@PathVariable UUID id) {
        try{
            alunoService.deleteAluno(id);
            return ResponseEntity.status(HttpStatus.OK).body("Deletado com sucesso!");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/aluno/{id}")
    public ResponseEntity<?> updateAluno(@PathVariable UUID id, @RequestBody AlunoRequestDTO data) {
        try{
            Aluno aluno = alunoService.updateAluno(id, data);
            return ResponseEntity.status(HttpStatus.OK).body(aluno);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }


}
