package br.ufrn.imd.Infra.Security;


import br.ufrn.imd.Entitys.Adm;
import br.ufrn.imd.Repositories.AdmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdmRepository admRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Adm adm = this.admRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
        return new org.springframework.security.core.userdetails.User(adm.getEmail(), adm.getPassword(), new ArrayList<>());
    }
}