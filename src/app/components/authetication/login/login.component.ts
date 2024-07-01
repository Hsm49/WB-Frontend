import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Userdto } from 'src/app/common/userdto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private authentication: AuthenticationService,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    let userDto = new Userdto(this.username, this.password);
    this.authentication.login(userDto).subscribe(
      (response: any) => { // Suponiendo que response contiene el token
        const token = response.token; // Asegúrate de obtener el token desde la respuesta
        const decoded: any = jwtDecode(token);
        console.log('Token recibido:', token);
        console.log('Token decodificado:', decoded);

        // Verificar el rol del usuario
        const roles = decoded.authorities.map((authority: string) => authority.replace("Optional[", "").replace("]", ""));
        console.log('Roles:', roles);

        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin/product']);
        } else {
          this.router.navigate(['/']);
        }

        // Almacena el token en el almacenamiento de sesión
        sessionStorage.setItem('token', token);
      },
      error => {
        console.error('Error durante el inicio de sesión:', error);
        // Manejar errores de autenticación aquí (por ejemplo, mostrar un mensaje de error al usuario)
      }
    );
  }
}