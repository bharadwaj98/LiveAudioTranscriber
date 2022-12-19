import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CloudIcon from '@mui/icons-material/Cloud';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

export const SideBar = ({ data, onDrawerSelect }) => {

    const [selected, setSelected] = React.useState(data[0])

    const handleListItemClick = (item) => {
        setSelected(item);
        onDrawerSelect(item)
    }

    const getIcon = (category) => {
        switch (category) {
            case "sports":
                return <SportsBaseballIcon />
            case 'car':
                return <DriveEtaIcon />
            case "weather":
                return <CloudIcon />
            case 'food':
                return <FastfoodIcon />
            case 'All':
                return <MiscellaneousServicesIcon />
            default:
                return null
        }
    }

    return (
        <Box sx={{
            display: 'flex', backdropFilter: 'blur(5px)',
            background: 'linear-gradient(180deg, rgba(255,255,255,1) -20%, rgba(8,103,239,0.5) 100%)',
            height: '60rem',
            paddingTop: '4rem',
            width: '20rem',
            justifyContent: 'center'
        }}>
            <CssBaseline />
            <List component="nav">
                {data?.map((text) => (
                    <ListItem key={text} disablePadding sx={{width: '15rem'}}>
                        <ListItemButton onClick={() => handleListItemClick(text)} selected={selected === text}>
                            <ListItemIcon>
                                {getIcon(text)}
                            </ListItemIcon>
                            <ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
