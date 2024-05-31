import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  nome: string;
  perfil: string;
}
