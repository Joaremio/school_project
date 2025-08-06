package br.ufrn.imd.Controller;


import br.ufrn.imd.DTO.LoginDTO;
import br.ufrn.imd.DTO.LoginResponseDTO;
import br.ufrn.imd.DTO.RegisterDTO;
import br.ufrn.imd.Services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity Login(@RequestBody LoginDTO data){
        try{
            LoginResponseDTO response = authService.login(data);
            return ResponseEntity.ok(response);
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/register")
    public ResponseEntity Register(@RequestBody RegisterDTO data){
        try{
            LoginResponseDTO response = authService.register(data);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
