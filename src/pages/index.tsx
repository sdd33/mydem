import styles from './index.less';
import { createContext, useContext } from 'react';

export default function IndexPage() {

  function useTest() {
    let name = 1;
    return {
      name,
      setName: (n:any)=> {
        name = n;
      }
    }
  }
  const Context = createContext(useTest());

  let {name, setName} = useContext(Context);

  return (
      <div>
        <h1>{name}</h1>
      </div>
  );
}
