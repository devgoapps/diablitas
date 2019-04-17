import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {

  public API: string = 'http://220.1.1.243/diablitas/';

  constructor(private http: HttpClient) { }

	buildGetRequest(uri, params?) {
		return this.http
				.get(this.API + uri, { params: params })
				.pipe(catchError(this.handleError));
	}

	buildPostRequest(uri, data) {
		return this.http
				.post(this.API + uri, data)
				.pipe(catchError(this.handleError));
	}

	buildPutRequest(uri, data) {
		return this.http
				.put(this.API + uri, data)
				.pipe(catchError(this.handleError));
	}

	buildDeleteRequest(uri, id) {
		return this.http
				.delete(this.API + uri + id)
				.pipe(catchError(this.handleError));
	}

	private handleError(error: HttpErrorResponse) {
		if(error && error.status == 401)
			return new ErrorObservable({ message: 'Tu sesión ha expirado o no tienes permisos para realizar esta acción.' });
		else if(error && error.status == 404)
			return new ErrorObservable({ message: 'No se encontro el servicio solicitado' });
		else if(error && error.status == 500)
			return new ErrorObservable({ message: 'Ocurrió un problema con el servidor.' });
		else 
			return new ErrorObservable(error.error);
	}

}
