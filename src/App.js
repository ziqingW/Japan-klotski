import { useState } from 'react';
import GridLayout from "react-grid-layout";

const LAYOUT = [
  {i: "0", x: 0, y: 0, w: 1, h: 2, name: "父親"},
  {i: "1", x: 1, y: 0, w: 2, h: 2, name: "娘"},
  {i: "2", x: 3, y: 0, w: 1, h: 2, name: "母親"},
  {i: "3", x: 0, y: 2, w: 1, h: 2, name: "祖父"},
  {i: "4", x: 1, y: 2, w: 2, h: 1, name: "兄弟"},
  {i: "5", x: 1, y: 3, w: 1, h: 1, name: "花道"},
  {i: "6", x: 2, y: 3, w: 1, h: 1, name: "茶道"},
  {i: "7", x: 3, y: 2, w: 1, h: 2, name: "祖母"},
  {i: "8", x: 0, y: 4, w: 1, h: 1, name: "和裁"},
  {i: "9", x: 4, y: 4, w: 1, h: 1, name: "書道"},
];

const CHEAT_LAYOUT = [
  {i: "0", x: 0, y: 0, w: 1, h: 2, name: "父親"},
  {i: "1", x: 1, y: 2, w: 2, h: 2, name: "娘"},
  {i: "2", x: 3, y: 0, w: 1, h: 2, name: "母親"},
  {i: "3", x: 0, y: 2, w: 1, h: 2, name: "祖父"},
  {i: "4", x: 1, y: 0, w: 2, h: 1, name: "兄弟"},
  {i: "5", x: 1, y: 1, w: 1, h: 1, name: "花道"},
  {i: "6", x: 2, y: 1, w: 1, h: 1, name: "茶道"},
  {i: "7", x: 3, y: 2, w: 1, h: 2, name: "祖母"},
  {i: "8", x: 0, y: 4, w: 1, h: 1, name: "和裁"},
  {i: "9", x: 4, y: 4, w: 1, h: 1, name: "書道"},
];

const styles = {
  block: {
    border: '1px solid #333',
  },
  grid : {
    fontSize: "1.5em",
    fontWeight: "bold",
    borderRadius: "4px",
    boxSizing: "border-box",
    background: "#ca9",
    color: "#202020",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
}
const gridSettings = {
  cols: 4,
  rowHeight: 70,
  width: 280,
  margin: [2, 2],
  containerPadding: [0, 0],
  isResizable: false,
  isBounded: true,
  preventCollision: true,
  compactType: null,
  draggableHandle: '.moving-grid',
};

export default function App() {

  // try to get from storage or load defaults
  const loadInitialState = () => {
    const savedLayout = loadLayout();
    return savedLayout || LAYOUT.slice(0);
  };

  // we only need to check for valid drags and win
  // state when the a block is released from drag
  const onDragStop = (layout, oldBlk, newBlk) => {
    const dx = Math.abs(newBlk.x - oldBlk.x);
    const dy = Math.abs(newBlk.y - oldBlk.y);
    if (dx + dy > 1) {
      global.location.reload();
      return;
    }
    saveLayout(layout);
    setWin(newBlk.i === '1' && newBlk.x === 1 && newBlk.y === 3);
  }

  // we reset the game by saving default layout and reloading
  // the page (i can't figure out the clean method atm).
  const resetGame = evt => {
    const startingLayout = LAYOUT.slice(0);
    saveLayout(startingLayout);
    global.location.reload();
  }

  // just update the layout to have the square block
  // just above the exit
  const cheatGame = evt => {
    setLayout(CHEAT_LAYOUT.slice(0));
  }

  const [win, setWin] = useState(0);
  const [layout, setLayout] = useState(loadInitialState);

  return (
    <div>
      <GridLayout
        {...gridSettings}
        layout={layout}
        onDragStop={onDragStop}
      >
        {LAYOUT.map((blk, i) => (
          <div
            key={blk.i}
            style={styles.grid}
            className={!win && 'moving-grid'}>{blk.name}</div>
        ))}
      </GridLayout>
      {!!win && <div><strong>You solved it!</strong></div>}
      <input type="button" onClick={resetGame} value="Reset" />
      <input type="button" onClick={cheatGame} value="Cheat" />
    </div>
  );
}

// helper: loads layout from local storage
function loadLayout() {
  if (global.localStorage) {
    try {
      const data = JSON.parse(global.localStorage.getItem('klotski')) || {};
      return data.layout;
    } catch (e) {}
  }
  return LAYOUT;
}

// helper: save layout into local storage
function saveLayout(layout) {
  if (global.localStorage) {
    global.localStorage.setItem('klotski', JSON.stringify({ 'layout': layout }));
  }
}

