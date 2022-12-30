import React from 'react';
import Second from '../assets/seconds.svg';
import Pause from '../assets/Pause.svg';
import Play from '../assets/Play.svg';
import Rewind from '../assets/Rewind.svg';
import Volume from '../assets/Volume.svg';
import Mute from '../assets/Mute.svg';

function Icon() {
  return <img src={Second} alt="second" />;
}
function Icon2() {
  return <img src={Pause} alt="secPauseond" />;
}
function Icon3() {
  return <img src={Play} alt="Play" />;
}
function Icon4() {
  return <img src={Rewind} alt="Rewind" />;
}
function Icon5() {
  return <img src={Volume} alt="Volume" style={{ width: '26px' }} />;
}
function Icon6() {
  return <img src={Mute} alt="Mute" style={{ width: '13px' }} />;
}

export { Icon, Icon2, Icon3, Icon4, Icon5, Icon6 };
