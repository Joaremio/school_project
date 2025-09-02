package br.ufrn.imd.Repositories;

import br.ufrn.imd.Entitys.Adm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdmRepository extends JpaRepository<Adm, String> {
    Optional<Adm> findByEmail(String email);
}
