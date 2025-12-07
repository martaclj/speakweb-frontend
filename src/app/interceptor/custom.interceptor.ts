import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('speakweb_token'); // leemos token guardado en Login

  const clonedReq = req.clone({ // se clona la petición para agregarle cabecera con token
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(clonedReq);
};
