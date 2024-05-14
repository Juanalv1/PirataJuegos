import { useEffect, useRef } from 'react';

export default function Banner() {
  const banner = useRef();

  const atOptions = {
    key: '5557f62eb118a4babe0d7222557cbfa1',
    format: 'iframe',
    height: 90,
    width: 728,
    params: {},
  };

  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement('script');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `//www.highperformancedformats.com/${atOptions.key}/invoke.js`;
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      banner.current.appendChild(conf);
      banner.current.appendChild(script);
    }
  }, [banner]);

  return <div className=" hidden mx-2 my-5 flex justify-center items-center text-white text-center" ref={banner}></div>;
}
