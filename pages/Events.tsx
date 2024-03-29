import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
	AppBar,
	Box,
	CssBaseline,
	Toolbar,
	useMediaQuery,
} from "@mui/material";

import Display from "@/modules/events/events-page/Display";
import DisplayWrapper from "@/modules/events/events-page/layout/main/DisplayWrapper";
import SideBarWrapper from "@/modules/events/events-page/layout/sidebar/SideBarWrapper";
import Header from "@/modules/events/events-page/layout/app-bar/Header";
import Sidebar from "@/modules/events/events-page/layout/sidebar";
import { ErrorBoundary } from "@/modules/errors/ErrorBoundary";

export default function Events() {
	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
	const [sideBarOpen, setSideBarOpen] = useState(true);

	useEffect(() => {
		setSideBarOpen(!matchDownMd);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matchDownMd]);
	return (
		<>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				{/* header */}
				<ErrorBoundary>
					<AppBar
						enableColorOnDark
						position='fixed'
						color='inherit'
						elevation={0}
						sx={{
							bgcolor: theme.palette.background.default,
							transition: sideBarOpen
								? theme.transitions.create("width")
								: "none",
						}}
					>
						<Toolbar>
							<Header open={sideBarOpen} setOpen={setSideBarOpen} />
						</Toolbar>
					</AppBar>
				</ErrorBoundary>
				<ErrorBoundary>
					<SideBarWrapper open={sideBarOpen} setOpen={setSideBarOpen}>
						<Sidebar />
					</SideBarWrapper>
				</ErrorBoundary>
				<ErrorBoundary>
					<DisplayWrapper open={sideBarOpen} setOpen={setSideBarOpen}>
						<Display />
					</DisplayWrapper>
				</ErrorBoundary>
			</Box>
		</>
	);
}
