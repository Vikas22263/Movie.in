import React from "react";
import { TailSpin } from 'react-loader-spinner'

const Loading = () => {
  return (
 <div className="absolute w-screen h-screen flex items-center justify-center">
  
 <TailSpin
      visible={true}
      
      height="100"
      width="100"
      color="#2a47a7"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      />
 </div>
  );
};

export default Loading;
