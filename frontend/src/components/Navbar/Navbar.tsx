import { AppBar, Toolbar, Typography } from '@material-ui/core'

const Navbar = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant="h5">Advisors</Typography>
      </Toolbar>
    </AppBar>
  );
}

export {Navbar}