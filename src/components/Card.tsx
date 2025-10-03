import { ReactNode } from 'react';
export default function Card({children}:{children:ReactNode}){
  return <div className="card"><div className="card-body">{children}</div></div>
}
