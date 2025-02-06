
export class Noticia {

    id: string;
    titulo: string;
    descricao: string;

    constructor(id: string, titulo: string, descricao: string) {
      this.id = id;
      this.titulo = titulo;
      this.descricao = descricao;
    }
}