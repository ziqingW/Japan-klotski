import React, { Component } from 'react';
import {Grid, withStyles, Dialog, DialogTitle} from '@material-ui/core'

const styles = {
  helpContents: {
    padding: "15px",

  }
}

class HelpText extends Component {

  handleClose = () => {
    this.props.onClose();
  }

  render() {
    const { classes, onClose, ...other } = this.props
    return (
      <Dialog onClose={this.handleClose} {...other}>
        <DialogTitle id="simple-dialog-title">How to play</DialogTitle>
        <Grid className={classes.helpContents} container justify="center" direction="column" alignItems="center">
          <p>Move blocks to help the poor Daughter<span style={{color: "red"}}><b>(娘)</b></span> escape to freedom at the <span style={{color: "green"}}><b>EXIT</b></span>.</p>
          <h4>** You can only move one block one space at one time!! **</h4>
        </Grid>
      </Dialog>
    )
  }
}

HelpText = withStyles(styles)(HelpText)
export default HelpText
