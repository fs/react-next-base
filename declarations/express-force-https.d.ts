import { Request, Response, NextFunction } from 'express';

declare module 'express-force-https' {
  function Redirect(req: Request, res: Response, next: NextFunction): void;

  export default Redirect;
}
