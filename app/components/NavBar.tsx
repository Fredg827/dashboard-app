"use client"

import React from "react";

import Link from "next/link";

import { Box, AppBar, Toolbar, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";

const NavBar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ width: "100%", top: 0 }}>
        <Toolbar
          sx={{ display: "flex", justifyContent: "flex-start", width: "50%" }}
        >
          <Button color="inherit" sx={{ flex: 1 }} startIcon={<HomeIcon />}>
            <Link href="/">Home</Link>
          </Button>
          <Button color="inherit" sx={{ flex: 1 }} startIcon={<BusinessIcon />}>
            <Link href="/companies">Companies</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
