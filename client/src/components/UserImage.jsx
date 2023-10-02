import { Box } from "@mui/material";
import fileNames from "data/fileNames";

const UserImage = ({ image, size = "60px" }) => {
  // For faster loading, use small local image if possible
  if (fileNames.find((name) => name === image)) {
    image = `/assets/${image}`;
    image = image.replace(/\.[^/.]+$/, "_small.webp");
  } else {
    image = `https://social-media-app-server.onrender.com/${image}`;
  }

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image}
        loading="lazy"
      />
    </Box>
  );
};

export default UserImage;
