import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Userdto } from 'src/app/common/userdto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import jwt_decode from 'jwt-decode'; // Importa jwt-decode

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
      token => {
        console.log('Token recibido:', token);

        // Decodificar el token para obtener los datos del usuario
        let decodedToken = jwt_decode(token);
        console.log('Token decodificado:', decodedToken);

        // Verificar el tipo de usuario
        if (decodedToken && decodedToken.authorities.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin/product']);
        } else {
          this.router.navigate(['/']);
        }

        // Almacena el token en el almacenamiento de sesión
        this.sessionStorage.setItem('token', token);
      },
      error => {
        console.error('Error durante el inicio de sesión:', error);
        // Manejar errores de autenticación aquí (por ejemplo, mostrar un mensaje de error al usuario)
      }
    );
  }
}
