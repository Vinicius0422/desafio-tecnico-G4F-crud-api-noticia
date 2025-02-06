interface Noticia {
  titulo: string;
  descricao: string;
}

export class NoticiaDTORequest {

  titulo: string;
  descricao: string;

  constructor(titulo: string, descricao: string) {
    this.titulo = titulo;
    this.descricao = descricao;
  }
    
  static validarNoticia(noticia: Noticia): void {
    const { titulo, descricao } = noticia;

    if (!titulo || !descricao) {
      throw new Error('Título e descrição são obrigatórios');
    }
  
    if (typeof titulo !== 'string' || typeof descricao !== 'string') {
      throw new Error('Título e conteúdo devem ser strings');
    }
  }
}
  
