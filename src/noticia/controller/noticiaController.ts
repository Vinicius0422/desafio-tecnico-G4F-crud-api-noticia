import { Request, Response } from 'express';

import{ NoticiaDTORequest } from '../dtos/noticiaDTORequest'
import * as noticiaService from '../service/noticiaService';
import { NoticiaNaoEncontradaError } from '../exception/noticiaNaoEncontrada';

const sendResponse = (res: Response, statusCode: number, data: any) => {
  res.status(statusCode).json(data);
}

const sendError = (res: Response, statusCode: number, message: string) => {
  res.status(statusCode).json({ erro: message });
}

export const listarNoticias = async (req: Request, res: Response) => {
  try {
    const noticias = noticiaService.listarNoticias();
    sendResponse(res, 200, noticias);
  } catch (error: any) {
    sendError(res, 400, error.message);
  }
}

export const listarNoticiasPagindadas = (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const noticias = noticiaService.listarNoticiasPaginadas(pageNumber, pageSize);
    sendResponse(res, 200, noticias);
  } catch (error: any) {
    sendError(res, 400, error.message);
  }
}

export const buscarNoticiaPorId = (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const noticia = noticiaService.buscarNoticiaPorId(id);
    sendResponse(res, 200, noticia);
  } catch (error: any) {
    if(error instanceof NoticiaNaoEncontradaError)
      sendError(res, error.statusCode, error.message);
    else
    sendError(res, 400, error.message);
  }
}

export const criarNoticia = (req: Request, res: Response) => {
    try {
      const { titulo, descricao } = req.body;
      NoticiaDTORequest.validarNoticia({ titulo, descricao });
      const novaNoticia = noticiaService.criarNoticia(titulo, descricao);
  
      sendResponse(res, 201, novaNoticia);
    } catch (error: any) {
      sendError(res, 400, error.message);
    }
}

export const editarNoticia = (req: Request, res: Response) => {
    try {
      const { titulo, descricao } = req.body;
      NoticiaDTORequest.validarNoticia({ titulo, descricao });
      const { id } = req.params
      const noticiaEditada = noticiaService.editarNoticia(id, titulo, descricao);
  
      sendResponse(res, 200, noticiaEditada);
    } catch (error: any) {
      if(error instanceof NoticiaNaoEncontradaError)
        sendError(res, error.statusCode, error.message);
      else
      sendError(res, 400, error.message);
    }
}

export const deletarNoticia = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    noticiaService.deletarNoticia(id);
    res.status(204).send();
  } catch (error : any) {
    if(error instanceof NoticiaNaoEncontradaError)
      sendError(res, error.statusCode, error.message);
    else
    sendError(res, 400, error.message);
  }
}