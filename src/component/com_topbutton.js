import Lottie from 'react-lottie';
import animationData from '../lotties/animasi.json';

function Topbutton(){
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  function handleClick(e){
    e.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className='button_up' onClick={handleClick}>
      <Lottie 
      options={defaultOptions}
        height={100}
        width={57}
      />
    </div>
  );
}

export default Topbutton;