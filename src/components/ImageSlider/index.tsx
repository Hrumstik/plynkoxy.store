import firstScreen from "../../images/firstScreen.webp";
import secondScren from "../../images/secondScreen.webp";
import thirdScreen from "../../images/thirdScreen.webp";
import fourthScreen from "../../images/fourthScreen.webp";

export default function ImageSlider() {
  return (
    <div className="w-full font-roboto overflow-x-auto pb-1">
      <div className="flex  w-[175vw] border-box">
        <img
          src={firstScreen}
          className="p-[5px] rounded-2xl max-h-52"
          alt="screenshot"
        ></img>
        <img
          src={secondScren}
          className="p-[5px] rounded-2xl max-h-52"
          alt="screenshot"
        ></img>
        <img
          src={thirdScreen}
          className="p-[5px] rounded-2xl max-h-52"
          alt="screenshot"
        ></img>
        <img
          src={fourthScreen}
          className="p-[5px] rounded-2xl max-h-52"
          alt="screenshot"
        ></img>
      </div>
    </div>
  );
}
