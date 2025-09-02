package br.ufrn.imd.Services;


import br.ufrn.imd.DTO.LoginDTO;
import br.ufrn.imd.DTO.LoginResponseDTO;
import br.ufrn.imd.DTO.RegisterDTO;
import br.ufrn.imd.Entitys.Adm;
import br.ufrn.imd.Infra.Security.TokenService;
import br.ufrn.imd.Repositories.AdmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    AdmRepository admRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TokenService tokenService;

    public LoginResponseDTO login(LoginDTO data){
        Adm adm = admRepository.findByEmail(data.email())
                .orElseThrow(() -> new RuntimeException("Adm not found"));
        if(passwordEncoder.matches(data.password(),adm.getPassword())){
            String token = tokenService.generateToken(adm);
            return new LoginResponseDTO(adm.getName(), token);
        }else{
            throw new RuntimeException("Wrong password");
        }
    }

    public LoginResponseDTO register(RegisterDTO data){
        Optional<Adm> adm = admRepository.findByEmail(data.email());
        if(adm.isEmpty()){
            Adm newAdm = new Adm();
            newAdm.setEmail(data.email());
            newAdm.setPassword(passwordEncoder.encode(data.password()));
            newAdm.setName(data.name());
            admRepository.save(newAdm);

            String token = tokenService.generateToken(newAdm);

            return new LoginResponseDTO(newAdm.getName(), token);
        }
        throw new RuntimeException("Email already in use");
    }
}
