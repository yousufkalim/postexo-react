import React from 'react';
import Second from '../assets/Second.svg';
import Pause from '../assets/Pause.svg';
import Play from '../assets/Play.svg';
import Rewind from '../assets/Rewinds.svg';
import Volume from '../assets/Volume.svg';
import Mute from '../assets/Mute.svg';

function Icon() {
  return (
    <div className="rewind_container">
      <div className="audio_tooltip">Only audio would be forward</div>
      <img src={Second} alt="Second" />
    </div>
  );
}
function Icon2() {
  return <img src={Pause} alt="secPauseond" />;
}
function Icon3() {
  return <img style={{ paddingInline: '8px' }} src={Play} alt="Play" />;
}
function Icon4() {
  return (
    <div className="rewind_container">
      <div className="audio_tooltip">Only audio would be rewind</div>
      <img src={Rewind} alt="Rewind" />
    </div>
  );
}
function Icon5() {
  return <img src={Volume} alt="Volume" style={{ width: '26px' }} />;
}
function Icon6() {
  return <img src={Mute} alt="Mute" style={{ width: '13px' }} />;
}

export { Icon, Icon2, Icon3, Icon4, Icon5, Icon6 };
