import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/FriendToggle";
import WidgetWrapper from "components/WidgetWrapper";
import users from "data/users";

const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();
  const friends = users.find((user) => user._id === userId).friends;

  return (
      <WidgetWrapper>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
        >
          Friend List
        </Typography>
        <Box display="flex" flexDirection="column" gap="1.5rem">
          {friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))}
        </Box>
      </WidgetWrapper>
  );
};

export default FriendListWidget;
