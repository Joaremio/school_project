package br.ufrn.imd.Controller;

import br.ufrn.imd.Entitys.Turma;
import br.ufrn.imd.Repositories.TurmaRepository;
import br.ufrn.imd.Services.TurmaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/turmas")
public class TurmaController {

    @Autowired
    private TurmaRepository turmaRepository;
    @Autowired
    private TurmaService turmaService;

    // Criar uma nova turma
    @PostMapping
    public ResponseEntity<Turma> criarTurma(@RequestBody Turma turma) {
        Turma novaTurma = turmaRepository.save(turma);
        return new ResponseEntity<>(novaTurma, HttpStatus.CREATED);
    }

    // Listar todas as turmas
    @GetMapping
    public ResponseEntity<List<Turma>> listarTurmas() {
        List<Turma> turmas = turmaRepository.findAll();
        return new ResponseEntity<>(turmas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Turma> buscarTurmaPorId(@PathVariable UUID id) {
        Turma turma = turmaService.buscarTurma(id);
        return new ResponseEntity<>(turma, HttpStatus.OK);
    }
}
