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
@RequestMapping("/aluno")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private TurmaService turmaService;

    @GetMapping()
    public ResponseEntity<List<Aluno>> getAlunos() {
        List<Aluno> alunos = alunoService.getAlunos();
        return ResponseEntity.status(HttpStatus.OK).body(alunos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> getAluno(@PathVariable UUID id) {
        Aluno aluno = alunoService.getAluno(id);
        return ResponseEntity.ok(aluno);
    }

    @PostMapping()
    public ResponseEntity<Aluno> createAluno(@RequestBody AlunoRequestDTO data) {
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

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> updateAluno(@PathVariable UUID id, @RequestBody AlunoRequestDTO data) {
        Aluno alunoAtualizado = alunoService.updateAluno(id, data);
        return ResponseEntity.ok(alunoAtualizado);
    }


}

