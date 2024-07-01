import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Userdto } from 'src/app/common/userdto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  ngOnInit(): void { }

  constructor(
    private authentication: AuthenticationService,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) { }

  login() {
    let userDto = new Userdto(this.username, this.password);
    this.authentication.login(userDto).subscribe(
      (response: any) => {
        const token = response.token; // Asegúrate de que la respuesta contiene el token

        console.log('Token recibido:', token);
        this.sessionStorage.setItem('token', token);

        try {
          const decodedToken: any = jwtDecode(token);
          console.log('Token decodificado:', decodedToken);

          // Almacena la información del usuario en el almacenamiento de sesión
          this.sessionStorage.setItem('token', token);

          // Verificar el rol del usuario
          const roles = decodedToken.authorities.map((authority: string) =>
            authority.replace("Optional[", "").replace("]", "")
          );
          console.log('Roles:', roles);

          if (roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/admin/product']);
          } else {
            this.router.navigate(['/']);
          }
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          // Manejar errores de decodificación aquí
        }
      },
      error => {
        console.error('Error durante el inicio de sesión:', error);
        // Manejar errores de autenticación aquí (por ejemplo, mostrar un mensaje de error al usuario)
      }
    );
    console.log(userDto);
  }
}
