/* eslint-disable prefer-destructuring */
import React from 'react';
import { Player, Shortcut, ForwardControl, ReplayControl } from 'video-react';

function VideoReact() {
  const newShortcuts = [
    // Press number 1 to jump to the postion of 10%
    {
      keyCode: 49, // Number 1
      // handle is the function to control the player
      // player: the player's state
      // actions: the player's actions
      handle: (player, actions) => {
        const duration = player.duration;
        // jump to the postion of 10%
        actions.seek(duration * 0.1);
      },
    },
    {
      keyCode: 38, // Up arrow
      handle: () => {}, // override it's default handle
    },
    // Ctrl/Cmd + Right arrow to go forward 30 seconds
    {
      keyCode: 39, // Right arrow
      ctrl: true, // Ctrl/Cmd
      handle: (player, actions) => {
        if (!player.hasStarted) {
          return;
        }

        // this operation param is option
        // helps to display a bezel
        const operation = {
          action: 'forward-30',
          source: 'shortcut',
        };
        actions.forward(30, operation); // Go forward 30 seconds
      },
    },
  ];
  return (
    <Player src="http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4">
      <ReplayControl seconds={5} order={2.1} />
      <ForwardControl seconds={10} order={3.2} />
      <Shortcut clickable={false} shortcuts={newShortcuts} />
    </Player>
  );
}

export default VideoReact;
