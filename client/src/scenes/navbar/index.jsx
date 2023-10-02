import {
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect, useRef } from "react";
import { setMode, setLogout, toggleMobileMenuOpen } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import MobileMenu from "./MobileMenu";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isMobileMenuOpen = useSelector((state) => state.isMobileMenuOpen);
  gsap.registerPlugin(ScrollTrigger);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const secondary = theme.palette.secondary.main;
  const secondaryDark = theme.palette.secondary.dark;
  const alt = theme.palette.background.alt;
  const shadow = theme.palette.shadow.main;
  const nav = useRef(); // create a ref for the root level element (for scoping)

  const fullName = `${user.firstName} ${user.lastName}`;
  useLayoutEffect(() => {
    // create our context. This function is invoked immediately and all GSAP animations and ScrollTriggers created during the execution of this function get recorded so we can revert() them later (cleanup)
    let ctx = gsap.context(() => {
      // Header toggle animation
      const ToggleHeader = gsap
        .from("#navbar", {
          yPercent: -100,
          paused: true,
          duration: 0.4,
        })
        .progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          self.direction === -1 ? ToggleHeader.play() : ToggleHeader.reverse();
        },
      });
    }, nav); // <- IMPORTANT! Scopes selector text

    return () => ctx.revert(); // cleanup
  }); // <- empty dependency Array so it doesn't re-run on every render
  return (
    <div ref={nav}>
      <FlexBetween
        padding="1rem 6%"
        backgroundColor={alt}
        position="fixed"
        width="100%"
        top="0"
        left="0"
        boxShadow={`0px 1px 10px -4px ${shadow}`}
        zIndex="1"
        id="navbar"
      >
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color={secondary}
            onClick={() => navigate("/")}
            sx={{
              "&:hover": {
                color: secondaryDark,
                cursor: "pointer",
              },
            }}
          >
            LinkUp
          </Typography>
          {isNonMobileScreens && (
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>

        {/* Desktop Nav */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => {
              dispatch(toggleMobileMenuOpen());
            }}
          >
            <Menu />
          </IconButton>
        )}

        {/* Mobile Nav */}
        {!isNonMobileScreens && isMobileMenuOpen && <MobileMenu />}
      </FlexBetween>
    </div>
  );
};

export default Navbar;
