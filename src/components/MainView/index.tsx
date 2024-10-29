import { Dispatch, SetStateAction, useState } from "react";
import { useIntl } from "react-intl";
import AppLogo from "../AppLogo";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import {
  MainContainer,
  AppNameContainer,
  AppHeader,
  AppHeaderInfoContainer,
  AppRateContainer,
  AppRatesAndSection,
  AppRatesAndReviewsContainer,
  AppStarsContainer,
  AppRatesCountContainer,
  AppRatingContainer,
  RatingContainer,
  StarsCount,
  RatingChart,
  ReviewsSection,
  VerticalDivider,
  HorizontalDivider,
} from "../styles";
import InstallButton from "../InstallButton";
import Review from "../Review";
import InstallationProgess from "../InstallationProgress";
import SizeIcon from "../Icons/SizeIcon";
import ImageSlider from "../ImageSlider";
import useSanity from "../../shared/hooks/useSanity";
import { checkLocale } from "../../shared/helpers/languages";

interface Props {
  setView: Dispatch<SetStateAction<string>>;
}

const ratingsData = [
  { stars: 5, rating: 95 },
  { stars: 4, rating: 5 },
  { stars: 3, rating: 0 },
  { stars: 2, rating: 0 },
  { stars: 1, rating: 0 },
];

const MainView: React.FC<Props> = () => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const [ratingsOpen, setRatingsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const toggleReviewsCollapse = () => {
    setRatingsOpen(!ratingsOpen);
  };

  const { data, urlFor } = useSanity(
    `appName, version, wahtsNew, lastUpdate, developerName, size, fullDescription, rating, countOfReviews, countOfDownloads, countOfReviewsFull, countOfStars, reviews, shortDescription`
  );

  if (!data) {
    return <></>;
  }

  return (
    <MainContainer>
      <div className="ml-6 mr-6 overflow-visible mb-2">
        <AppHeader>
          <AppLogo />
          <AppHeaderInfoContainer>
            <AppNameContainer>{data.appName}</AppNameContainer>
            <InstallationProgess />
          </AppHeaderInfoContainer>
        </AppHeader>

        <div className="w-full font-roboto overflow-x-auto pt-2.5 mb-2 pb-4">
          <div className="flex  w-[125vw]">
            <div className="w-1/3 h-10  text-white flex flex-col items-center justify-center border-r-[1px] border-gray-300">
              <span className="flex items-center h-5 font-medium text-[14px] text-[#030303] mr-[2px]">
                <span className="leading-[13px]">{data.rating}</span>
                <span>
                  <StarIcon
                    sx={{
                      fontSize: "16px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </span>
              </span>
              <span className="flex justify-center items-center text-[12px] text-[#898989] pt-[5px]">
                {intl.formatMessage({
                  id: "rating",
                  defaultMessage: "Rating",
                })}
              </span>
            </div>
            <div className="w-1/3 h-10  text-white flex flex-col items-center justify-center border-r-[1px] border-gray-300">
              <span className="flex items-center h-5 font-medium text-[14px] text-[#030303] mr-[2px]">
                <SizeIcon />
              </span>
              <span className="flex justify-center items-center text-[12px] text-[#898989] pt-[5px]">
                {data.size}
              </span>
            </div>
            <div className="w-1/3 h-10  text-white flex flex-col items-center justify-center border-r-[1px] border-gray-300">
              <span className="flex items-center h-5 font-medium text-[14px] text-[#030303] mr-[2px]">
                <div className="border border-black text-sm px-2 mt-1">18+</div>
              </span>
              <span className="flex justify-center items-center text-[12px] text-[#898989] pt-[5px]">
                {intl.formatMessage({
                  id: "age",
                  defaultMessage: "Age",
                })}
              </span>
            </div>
            <div className="w-1/3 h-10  text-white flex flex-col items-center justify-center">
              <span className="flex items-center h-5 font-medium text-[14px] text-[#030303] mr-[2px]">
                {data.countOfDownloads}
              </span>
              <span className="flex justify-center items-center text-[12px] text-[#898989] pt-[5px]">
                {intl.formatMessage({
                  id: "downloads",
                  defaultMessage: "Downloads",
                })}
              </span>
            </div>
          </div>
        </div>

        <InstallButton appLink="/" />

        <ImageSlider />

        <div className="font-roboto font-normal text-[16px] text-[#636b6f] flex flex-col justify-center mt-3">
          {data.shortDescription[checkLocale()]}

          {isOpen && (
            <div className="whitespace-pre-line mt-2">
              {data.fullDescription[checkLocale()]}
            </div>
          )}

          <button
            className={`text-[green] text-[14px] mt-6 mb-6 font-medium ${
              isOpen ? "mt-2" : ""
            }`}
            onClick={toggleCollapse}
          >
            {isOpen
              ? intl.formatMessage({
                  id: "less",
                })
              : intl.formatMessage({
                  id: "more",
                })}
          </button>
        </div>
        <VerticalDivider />
      </div>

      <AppRatesAndSection>
        <div className="text-[16px] text-[#636b6f] font-normal text-left leading-normal uppercase-normal p-0 mb-4">
          {intl.formatMessage({
            id: "ratingAndReviews",
          })}
        </div>
        <AppRatesAndReviewsContainer>
          <AppRateContainer>{data.rating}</AppRateContainer>
          <AppStarsContainer>
            <Rating
              name="half-rating-read"
              defaultValue={data.countOfStars}
              precision={0.1}
              readOnly
              sx={{ color: "green", fontSize: "14px" }}
            />
          </AppStarsContainer>
          <AppRatesCountContainer>21,301</AppRatesCountContainer>
          <AppRatingContainer>
            {ratingsData.map((data, index) => (
              <RatingContainer key={index}>
                <StarsCount>{data.stars}</StarsCount>
                <RatingChart rating={data.rating} />
              </RatingContainer>
            ))}
          </AppRatingContainer>
        </AppRatesAndReviewsContainer>
      </AppRatesAndSection>
      <ReviewsSection>
        {data.reviews.slice(0, 3).map((review) => (
          <Review
            src={
              review.reviewAuthorIcon
                ? urlFor(review.reviewAuthorIcon)
                : undefined
            }
            avatarName="S"
            key={review.reviewAuthorName}
            name={review.reviewAuthorName}
            stars={review.reviewAuthorRating}
            text={review.reviewText[checkLocale()]}
            date={review.reviewDate}
            developerResponse
            developerResponseText={
              review.reviewResponseText
                ? review.reviewResponseText[checkLocale()]
                : undefined
            }
          />
        ))}
        {ratingsOpen &&
          data.reviews
            .slice(3)
            .map((review) => (
              <Review
                src={
                  review.reviewAuthorIcon
                    ? urlFor(review.reviewAuthorIcon)
                    : undefined
                }
                avatarName="S"
                key={review.reviewAuthorName}
                name={review.reviewAuthorName}
                stars={review.reviewAuthorRating}
                text={review.reviewText[checkLocale()]}
                date={review.reviewDate}
                developerResponse
                developerResponseText={
                  review.reviewResponseText
                    ? review.reviewResponseText[checkLocale()]
                    : undefined
                }
              />
            ))}
        <button
          className={`text-[green] text-[14px] mt-2 mb-2 font-medium ${
            ratingsOpen ? "mt-2" : ""
          }`}
          onClick={toggleReviewsCollapse}
        >
          {ratingsOpen
            ? intl.formatMessage({
                id: "hideReviews",
              })
            : intl.formatMessage({
                id: "allReviews",
              })}
        </button>
        <HorizontalDivider />
        <div className="font-roboto font-normal text-[#333] text-base text-left leading-normal uppercase-normal ">
          {intl.formatMessage({
            id: "whatsNew",
          })}
        </div>
        <div className="font-roboto font-normal text-[#333] text-base text-left leading-normal uppercase-normal ">
          {data.wahtsNew[checkLocale()]}
        </div>
        <HorizontalDivider />
        <div className="font-roboto font-normal text-[#333] text-base text-left leading-normal uppercase-normal ">
          {intl.formatMessage({
            id: "additionalInformation",
          })}
        </div>
        <div className="flex flex-col">
          <div className="relative flex flex-col w-175 py-1 px-0 pl-15 pr-0 text-left">
            <span className="text-[#000] font-normal text-[14px] leading-[25px]">
              {intl.formatMessage({
                id: "updatedOn",
              })}
            </span>
            <span className="text-[#636b6f] font-thin text-[14px] leading-[25px]">
              {data.lastUpdate}
            </span>
          </div>
          <div className="relative flex flex-col w-175 py-1 px-0 pl-15 pr-0 text-left">
            <span className="text-[#000] font-normal text-[14px] leading-[25px]">
              {intl.formatMessage({
                id: "downloadSize",
              })}
            </span>
            <span className="text-[#636b6f] font-thin text-[14px] leading-[25px]">
              {data.size}
            </span>
          </div>
          <div className="relative flex flex-col w-175 py-1 px-0 pl-15 pr-0 text-left">
            <span className="text-[#000] font-normal text-[14px] leading-[25px]">
              {intl.formatMessage({
                id: "downloads",
              })}
            </span>
            <span className="text-[#636b6f] font-thin text-[14px] leading-[25px]">
              {data.countOfDownloads}
            </span>
          </div>

          <div className="relative flex flex-col w-175 py-1 px-0 pl-15 pr-0 text-left">
            <span className="text-[#000] font-normal text-[14px] leading-[25px]">
              {intl.formatMessage({
                id: "version",
              })}
            </span>
            <span className="text-[#636b6f] font-thin text-[14px] leading-[25px]">
              {data.version}
            </span>
          </div>
          <div className="relative flex flex-col w-175 py-1 px-0 pl-15 pr-0 text-left">
            <span className="text-[#000] font-normal text-[14px] leading-[25px]">
              {intl.formatMessage({
                id: "age",
              })}
            </span>
            <span className="text-[#636b6f] font-thin text-[14px] leading-[25px]">
              18+
            </span>
          </div>
          <div className="relative flex flex-col w-175 py-1 px-0 pl-15 pr-0 text-left">
            <span className="text-[#000] font-normal text-[14px] leading-[25px]">
              {intl.formatMessage({
                id: "offeredBy",
              })}
            </span>
            <span className="text-[#636b6f] font-thin text-[14px] leading-[25px]">
              {data.developerName}
            </span>
          </div>
        </div>
      </ReviewsSection>
    </MainContainer>
  );
};

export default MainView;
