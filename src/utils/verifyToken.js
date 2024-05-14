import jwtVerify from 'jose';
import { prisma } from '../libs/db/prisma';

export async function verifyToken(req, res, next) {
  const { authorization } = req.headers
    if (!authorization) return res.status(401).json('usuario no valido');
  const token = authorization.slice(7);
  try{
    const encoder = new TextEncoder()
    const { payload } = await jwtVerify(token, encoder.encode('key'))
    const client = await prisma.user.findFirst({
      where: {
        guid: payload.guid
      }

    })
    if(client){
      next();
    } else { return res.status(401).json('usuario no valido')}
    
  }catch(e){
    console.error(e)
    return res.status(401).json('usuario no valido')
  }
  
}
