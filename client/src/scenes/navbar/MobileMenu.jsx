import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
} from "@mui/material";
import {
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Close,
} from "@mui/icons-material";
import { setMode, setLogout, toggleMobileMenuOpen } from "state";
import FlexBetween from "components/FlexBetween";

const MobileMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;

  const fullName = `${user.firstName} ${user.lastName}`;

  const isMenuOpen = useSelector((state) => state.isMobileMenuOpen);

  return (
    <Box // overlay
      display={isMenuOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex="10"
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        height="100%"
        zIndex="10"
        maxWidth="500px"
        minWidth="300px"
        backgroundColor={background}
      >
        {/* Close Icon */}
        <Box display="flex" justifyContent="flex-end" p="1rem">
          <IconButton onClick={() => dispatch(toggleMobileMenuOpen())}>
            <Close />
          </IconButton>
        </Box>

        {/* Menu Items */}
        <FlexBetween
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="3rem"
        >
          <IconButton
            onClick={() => dispatch(setMode())}
            sx={{ fontSize: "25px" }}
          >
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
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      </Box>
    </Box>
  );
};

export default MobileMenu;
