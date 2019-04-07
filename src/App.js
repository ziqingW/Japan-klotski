import React, { Component } from 'react';
import {Grid, Button, withStyles, Modal} from '@material-ui/core'
import {Details, Help} from '@material-ui/icons'
import GridLayout from "react-grid-layout";
import gridBack from './static/gridBack.jpg'
import sky from './static/sky.jpg'
import HelpText from './components/HelpText'

const layout = [
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
]

const originalLayout = getFromLS("layout") || Object.assign([],layout);

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundImage: `url(${sky})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },

  frame : {
    border : "1px solid black",
    width: '340px',
    height: '430px',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: "rgba(249, 249, 97, 0.5)",
  },

  help: {
    "&:hover" : {
      cursor: 'pointer',
      filter: "brightness(120%)"
    },
    color: "black",
    margin: "10px 0 0 0",
    fontSize: "2em",
  },

  grid : {
    '&:hover': {
      cursor: 'pointer',
      filter: "brightness(120%)"
    },
    fontFamily: 'wt034',
    boxShadow: "2px 2px 3px black",
    borderRadius: "2px",
    boxSizing: "border-box",
    backgroundImage : `url(${gridBack})`,
    fontSize: "3em",
    color: "#202020",
    textShadow: "1px 1px 1px #ccc",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  sBlock: {
    fontSize: "1.5em",
    color: "#3d2b20",
    textShadow: "1px 1px 1px white",
  },

  wBlock: {
    textShadow: "1px 1px 1px blue",
  },

  vBlock: {
    textShadow: "1px 1px 1px yellow",
  },

  bBlock: {
    fontSize: "5em",
    color: '#e04c23',
    textShadow: "2px 2px 1px black"
  },

  button : {
    '&:hover': {
      cursor: 'pointer',
    },
    marginTop: "20px",
    fontSize: "12px",
  },

  nonfreedom: {
    margin: "0",
    color: "green",
    opacity: "0.8",
    textShadow: "1px 1px 1px black"
  },

  freedom: {
    margin: "0",
    color: "green",
    filter: "brightness(150%)",
    textShadow: "1px 1px 1px black"
  },

  modalScreen: {
    minHeight: "100vh",
    backgroundColor: "rgba(255,255,255,0.7)",
  },

  modalContent : {
    width: "430px",
    height: "300px",
    textAlign: "center",
  }
}

function getFromLS (key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("klotski")) || {};
    } catch (e) {
    }
  }
  return ls[key];
}

function saveToLS (key, value) {
  if (global.localStorage) {
    global.localStorage.setItem("klotski", JSON.stringify({[key]: value}))
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      layout: JSON.parse(JSON.stringify(originalLayout)),
      prevLayout: [],
      dragged: null,
      win: false,
      helpOpen: false
    }
  }

  onLayoutChange = layout => {
    const dragged = this.state.dragged
    if (dragged) {
      const currentLayout = layout.slice(0,10)
      const newItem = currentLayout[dragged]
      const oldItem = this.state.prevLayout[dragged]
      if (newItem.x !== oldItem.x || newItem.y !== oldItem.y) {
          if (Math.abs(newItem.x - oldItem.x) >1 || Math.abs(newItem.y - oldItem.y) > 1 || (Math.abs(newItem.x - oldItem.x) >=1 && Math.abs(newItem.y - oldItem.y) >= 1)) {
            global.location.reload()
          } else {
            let win = false
            if (newItem.i === "1" && newItem.x === 1 && newItem.y ===3) {
              win = true
            }
            this.setState({layout: currentLayout, win: win})
            saveToLS("layout", currentLayout)
          }
    }
  }
  }

  onDragStart = (layout, oldItem, newItem, placeholder, e, element) => {
    this.setState({
      prevLayout : Object.assign([], layout.slice(0,10))
    })
  }

  onDragStop = (layout, oldItem, newItem, placeholder, e, element) => {
    this.setState({
      dragged: parseInt(newItem.i)
    })
  }

  openHelp = () => {
    this.setState({
      helpOpen: true
    })
  }

  handleClose = () => {
    this.setState({ helpOpen: false })
  }

  reset = e => {
    this.setState({
      layout: Object.assign([],layout),
      win: false
    })
    global.localStorage.clear()
  }

  render() {
    const {classes} = this.props
    return (
      <Grid container direction="column" justify="center" alignItems="center" className={classes.wrapper}>
        <h1 style={{margin: "15px 0 0 0", textShadow: "1px 1px 1px white"}}>Daughter in the box</h1>
        <Help className={classes.help} onClick={this.openHelp}/>
          <HelpText open={this.state.helpOpen} onClose={this.handleClose} />
        <h4><i>-- a klotski game --</i></h4>
        <Grid container justify="flex-start" alignItems="center" className={classes.frame}>
          <GridLayout layout={this.state.layout} cols={4} rowHeight={80} width={320} margin={[2,2]} containerPadding = {[0,0]} isResizable={false} preventCollision={true} compactType={null} onLayoutChange={this.onLayoutChange} onDragStart={this.onDragStart} onDragStop={this.onDragStop} draggableHandle=".moving-grid">
            {layout.map((block, i) => {
              const classTag = ([0,2,3,7].includes(i) ? classes.vBlock : ([5,6,8,9].includes(i) ? classes.sBlock : (i === 4 ? classes.wBlock : classes.bBlock)))
              return (
                <div className={this.state.win ? [classes.grid, classTag] : [classes.grid, "moving-grid", classTag]} key={block.i}>{block.name}</div>
          )}
            )}
          </GridLayout>
        </Grid>
          <Grid container justify="center" direction="column" alignItems="center">
          <Details style={{marginTop: "15px"}}/>
          <h3 className={this.state.win ? classes.freedom : classes.nonfreedom}><i>EXIT</i></h3>
            <Button variant="contained" className={classes.button} onClick={this.reset}>
              Reset
            </Button>
        </Grid>
        <Modal open={this.state.win}>
          <Grid container direction="column" justify="center" alignItems="center" className={classes.modalScreen}>
            <Grid container direction="column" justify="center" alignItems="center" className={classes.modalContent}>
              <div>
                <h3>You helped the Daughter get freedom!</h3>
                <h3>You are the hero!</h3>
              </div>
              <Button style={{marginTop:"50px"}} variant="contained" color="primary" onClick={this.reset}>
                Replay
              </Button>
          </Grid>
          </Grid>
        </Modal>
      </Grid>
    );
  }
}

App = withStyles(styles)(App)
export default App;
