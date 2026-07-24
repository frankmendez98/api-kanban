// src/common/services/base-http.service.ts
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';
import { Logger } from '@nestjs/common';

/**
 * @abstract BaseHttpService
 * @description Clase base abstracta para servicios que realizan peticiones HTTP.
 * Encapsula el HttpService de NestJS (Axios) y proporciona métodos genéricos
 * para GET, POST, PUT y DELETE.
 * Las clases que extiendan esta deben definir su `baseUrl` y el `Logger`.
 */
export abstract class BaseHttpService {
  protected abstract readonly logger: Logger;
  protected abstract readonly baseUrl: string;

  constructor(protected readonly httpService: HttpService) {}

  /**
   * Realiza una petición GET a la API externa.
   * @param path El path (ruta) específico del endpoint, relativo a la baseUrl.
   * @param config Opciones de configuración de Axios (headers, params, etc.).
   * @returns La respuesta de la API externa.
   */
  async get<T = any>(config?: AxiosRequestConfig): Promise<T> {
    const url = `${this.baseUrl}`;
    this.logger.debug(`GET request to: ${url}`);
    try {
      const response: AxiosResponse<T> = await firstValueFrom(
        this.httpService.get<T>(url, config),
      );
      this.logger.debug(`GET response from ${url}: Status ${response.status}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Error in GET ${url}: ${error.message}`);
      throw error; // Re-lanza el error para que sea manejado por el llamador
    }
  }

  /**
   * Realiza una petición POST a la API externa.
   * @param path El path (ruta) específico del endpoint, relativo a la baseUrl.
   * @param data Los datos a enviar en el cuerpo de la petición.
   * @param config Opciones de configuración de Axios (headers, etc.).
   * @returns La respuesta de la API externa.
   */
  protected async post<T = any, R = any>(
    path: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    const url = `${this.baseUrl}/${path}`;
    this.logger.debug(
      `POST request to: ${url} with data: ${JSON.stringify(data)}`,
    );
    try {
      const response: AxiosResponse<R> = await firstValueFrom(
        this.httpService.post<R>(url, data, config),
      );
      this.logger.debug(`POST response from ${url}: Status ${response.status}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Error in POST ${url}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Realiza una petición PUT a la API externa.
   * @param path El path (ruta) específico del endpoint, relativo a la baseUrl.
   * @param data Los datos a enviar en el cuerpo de la petición.
   * @param config Opciones de configuración de Axios (headers, etc.).
   * @returns La respuesta de la API externa.
   */
  protected async put<T = any, R = any>(
    path: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    const url = `${this.baseUrl}${path}`;
    this.logger.debug(
      `PUT request to: ${url} with data: ${JSON.stringify(data)}`,
    );
    try {
      const response: AxiosResponse<R> = await firstValueFrom(
        this.httpService.put<R>(url, data, config),
      );
      this.logger.debug(`PUT response from ${url}: Status ${response.status}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Error in PUT ${url}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Realiza una petición DELETE a la API externa.
   * @param path El path (ruta) específico del endpoint, relativo a la baseUrl.
   * @param config Opciones de configuración de Axios (headers, params, etc.).
   * @returns La respuesta de la API externa.
   */
  protected async delete<T = any>(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    this.logger.debug(`DELETE request to: ${url}`);
    try {
      const response: AxiosResponse<T> = await firstValueFrom(
        this.httpService.delete<T>(url, config),
      );
      this.logger.debug(
        `DELETE response from ${url}: Status ${response.status}`,
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error in DELETE ${url}: ${error.message}`);
      throw error;
    }
  }
}
