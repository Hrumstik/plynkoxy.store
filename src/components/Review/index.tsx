import Avatar from "@mui/material/Avatar";
import { Rating } from "@mui/material";
import {
  DeveloperResponseContainer,
  DeveloperResponseDate,
  DeveloperResponseHeader,
  DeveloperResponseName,
  DeveloperResponseText,
  ReviewAuthorContainer,
  ReviewContainer,
  ReviewDataContainer,
  ReviewDate,
  ReviewHeader,
  ReviewText,
  ReviewWrapper,
} from "../styles";
import useSanity from "../../shared/hooks/useSanity";

interface ReviewProps {
  avatarName: string;
  name: string;
  stars: number;
  text: string;
  date: string;
  src?: string;
  developerResponse?: boolean;
  developerResponseText?: string;
}

const Review: React.FC<ReviewProps> = ({
  avatarName,
  name,
  stars,
  text,
  date,
  src,
  developerResponse,
  developerResponseText,
}) => {
  const { data } = useSanity(`developerName`);
  return (
    <ReviewWrapper>
      <ReviewContainer>
        <ReviewHeader>
          <Avatar src={src}>{avatarName}</Avatar>
          <ReviewAuthorContainer>{name}</ReviewAuthorContainer>
        </ReviewHeader>
        <ReviewDataContainer>
          <Rating
            name="half-rating-read"
            defaultValue={stars}
            precision={1}
            readOnly
            sx={{ color: "green", fontSize: "14px" }}
          />
          <ReviewDate>{date}</ReviewDate>
        </ReviewDataContainer>
        <ReviewText>{text}</ReviewText>
      </ReviewContainer>
      {developerResponse && (
        <DeveloperResponseContainer>
          <DeveloperResponseHeader>
            <DeveloperResponseName>{data?.developerName}</DeveloperResponseName>
            <DeveloperResponseDate>{date}</DeveloperResponseDate>
          </DeveloperResponseHeader>
          <DeveloperResponseText>{developerResponseText}</DeveloperResponseText>
        </DeveloperResponseContainer>
      )}
    </ReviewWrapper>
  );
};

export default Review;
