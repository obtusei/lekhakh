import React from "react";
import { AppShell, Footer } from "@mantine/core";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import { NavData, SideBarProps } from "../../lib/interfaces";


interface ShellProps {
  children: React.ReactNode;
  isNavHidden?: boolean;
  sideBardata: SideBarProps[];
  navData:NavData;
  session?:any,
  isLoading?:boolean,
}

export function Shell({ children, isNavHidden,sideBardata,navData,session,isLoading}: ShellProps) {
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={isNavHidden ? <></> : <SideBar data={sideBardata} />}
      header={<Navbar navData={navData} session={session} isLoading={isLoading}/>}
    >

      {children}
    </AppShell>
  );
}
