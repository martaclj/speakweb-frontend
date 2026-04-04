import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('speakweb_token'); // leemos token guardado en Login

  // si no hubiera token:
  if (!token) return next(req);

  const clonedReq = req.clone({ // se clona la petición para agregarle cabecera con token
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(clonedReq);
};
