import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GitHub from '@mui/icons-material/GitHub';
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload';
import { toggleTemplateDialog } from '../redux/actions/templateDialogActions';
import { useDispatch } from 'react-redux';

type Anchor = 'left';

export default function SideBarButton() {
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const iconList = [
    <GitHub/>,
    <EditIcon/>,
    <UploadIcon/>,
  ]

  const onClickFuncList = [
    () => { window.open('https://github.com/rogerli2020/nyu-merchant-payment-page-generator/', '_blank'); },
    () => { dispatch(toggleTemplateDialog()); }
  ]

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'left' ? 250 : 'auto' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['GitHub', 'Edit Template', 'Upload Input Data',].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={onClickFuncList[index]}>
              <ListItemIcon>
                {true ? iconList[index] : <GitHub />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)}/>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            // style={{
            //   "backdropFilter": "blur(8px)"
            // }}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
