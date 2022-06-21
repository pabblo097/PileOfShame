import styled from "styled-components";
import ImageSizes from "../types/ImageSizes";

const Image = ({
  imageId,
  imageSize,
  size2x = false,
  alt = "",
}: {
  imageId: string;
  imageSize: ImageSizes;
  size2x?: boolean;
  alt?: string;
}): JSX.Element => {
  return (
    <StyledImage
      src={`https://images.igdb.com/igdb/image/upload/t_${imageSize}${
        size2x ? "_2x" : ""
      }/${imageId}.jpg`}
      alt={alt}
    />
  );
};

export default Image;

const StyledImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;
