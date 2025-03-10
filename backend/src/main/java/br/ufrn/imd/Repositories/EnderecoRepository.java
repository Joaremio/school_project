package br.ufrn.imd.Repositories;

import br.ufrn.imd.Entitys.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EnderecoRepository extends JpaRepository<Endereco, UUID> {
}
