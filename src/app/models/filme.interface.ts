import { Autor } from 'src/app/models/autor.interface';

export interface Filme {
    id?: number;
    nome: string;
    dtlanc: Date;
    sinopse: Text;
    img: string;
    autor: Autor;
}