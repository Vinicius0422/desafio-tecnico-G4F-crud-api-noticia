import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

import { Noticia } from '../model/noticiaModel';;
import { NoticiaDTOResponse } from '../dtos/noticiaDTOResponse';
import { NoticiaNaoEncontradaError } from '../exception/noticiaNaoEncontrada';

const dbFilePath = path.join(__dirname, '../../../db.json');
const noticiaNaoEncontrada = "Notícia não encontrada";

const lerDB = (): { noticias: Noticia[] } => {
    return JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
}

const gravarDB = (data: { noticias: Noticia[] }): void => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}

interface Paginacao {
    page: number,
    limit: number,
    total: number,
    totalPages: number,
    data: NoticiaDTOResponse[]
}

export const listarNoticias = (): NoticiaDTOResponse[] => {
    const db = lerDB();
    const noticias = db.noticias.map((noticia: Noticia) =>
         new NoticiaDTOResponse(noticia.id, noticia.titulo, noticia.descricao));
    return noticias;
}

export const listarNoticiasPaginadas = (pageNumber: number, pageSize: number): Paginacao => {
    const db = lerDB();
    const noticias = db.noticias;

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = pageNumber * pageSize;

    const noticiasPaginadas = noticias.slice(startIndex, endIndex);
    const noticiasPaginadasDTO = noticiasPaginadas.map((noticia: Noticia) =>
         new NoticiaDTOResponse(noticia.id, noticia.titulo, noticia.descricao));
    
    return {
        page: pageNumber,
        limit: pageSize,
        total: noticias.length,
        totalPages: Math.ceil(noticias.length / pageSize),
        data: noticiasPaginadasDTO
    }
}

export const buscarNoticiaPorId = (id: string): NoticiaDTOResponse => {
    const db = lerDB();
    const noticia = db.noticias.find((n: Noticia) => n.id === id)
    if(!noticia){
        throw new NoticiaNaoEncontradaError(noticiaNaoEncontrada, 404);
    }
    return new NoticiaDTOResponse(noticia.id, noticia.titulo, noticia.descricao);
}

export const criarNoticia = (titulo: string, descricao: string): NoticiaDTOResponse => {
    const db = lerDB();

    const id = uuidv4();
    const novaNoticia = new Noticia(id, titulo, descricao);

    db.noticias.push(novaNoticia);

    gravarDB(db);

    return new NoticiaDTOResponse(id, titulo, descricao);
}

export const editarNoticia = (id:string, titulo: string, descricao: string): NoticiaDTOResponse => {
    const db = lerDB();
    const noticia: Noticia | undefined = db.noticias.find((n: Noticia) => n.id === id);
    if(!noticia){
        throw new NoticiaNaoEncontradaError(noticiaNaoEncontrada, 404);
    }

    noticia.titulo = titulo;
    noticia.descricao = descricao;

    gravarDB(db);

    return new NoticiaDTOResponse(id, titulo, descricao);
}

export const deletarNoticia = (id: string): void => {
    const db = lerDB();
    const noticiaIndex = db.noticias.findIndex((n: { id: string }) => n.id === id);

    if (noticiaIndex === -1) {
        throw new NoticiaNaoEncontradaError (noticiaNaoEncontrada, 404); 
    }

    db.noticias.splice(noticiaIndex, 1);
    gravarDB(db);
}