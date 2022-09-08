import {useStore} from '@/pages/store';
import pic from '@/assets/error.png';
import React from 'react';
var str2ab = require('string-to-arraybuffer');

const Picture = ()=>{
  const {upimagestore} = useStore();

  const send = ()=>{
    const formData = new FormData();
    formData.append('img',new Blob([str2ab(pic)]));
    upimagestore.sendimage(formData).then((res)=>{
      console.log(res);
    })
  }

  return(
    <div>
      <img  src={pic}  alt=''/>
      <button onClick={send}>上传图片</button>
    </div>
  )
}

export default Picture;
