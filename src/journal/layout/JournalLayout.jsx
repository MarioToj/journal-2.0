import { Toolbar } from "@mui/material"
import { Box } from "@mui/system"
import { Navbar, SideBar } from "../componentes"

const drawerWidth = 240

export const JournalLayout = ({ children }) => {
  return (
    
    <Box sx={{ display: 'flex' }} className='animate__animated fadeIn animate__faster'>

    <Navbar drawerWidth={ drawerWidth } />

    <SideBar drawerWidth={ drawerWidth } />

    <Box 
    component='main'
    sx={{ flexGrow: 1, p: 3 }}>

    <Toolbar />

    {children}
    
    </Box>
     </Box>

  )
}
