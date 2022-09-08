import { useEffect, useRef, useState } from "react";
const THREE:any = require('three');
import { Layout } from 'antd';
const { Sider, Content } = Layout;


const Show = (props:any)=>{
  console.log(props.msg);
  let mylable = props.msg;
  mylable = !mylable;
  const message = mylable? '对':'错';
  return(
    <div>
      <p>{message}</p>
    </div>
  )
}

const Modolview = () => {
  const [state,setstate] = useState(true);
  return (
    <div>
          <button onClick={()=>{setstate(!state)}}>{state? '对':'错'}</button>
          <Show msg={state}/>
    </div>
  );
}

export default Modolview;
