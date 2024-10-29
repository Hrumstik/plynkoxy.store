import { useIntl } from "react-intl";
import {
  InstallationProgessWrapper,
  PercentagesMessage,
  VerifiedConteiner,
} from "../styles";
import { useSelector } from "react-redux";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { RootState } from "../../Redux/store/store";
import useSanity from "../../shared/hooks/useSanity";
import { getInstallState } from "../../Redux/feat/InstallSlice";
import { PWAInstallState } from "../../shared/models";

export default function InstallationProgess() {
  const { data } = useSanity(`developerName`);
  const intl = useIntl();

  const isDownloading = useSelector(
    (state: RootState) =>
      getInstallState(state.install) === PWAInstallState.downloading
  );

  const fakeDownloadProgress = useSelector(
    (state: RootState) => state.install.fakeDownloadProgress
  );

  return isDownloading ? (
    <InstallationProgessWrapper>
      <PercentagesMessage>{fakeDownloadProgress}</PercentagesMessage>
      <VerifiedConteiner>
        <VerifiedUserOutlinedIcon sx={{ fontSize: 10, color: "green" }} />
        {intl.formatMessage({ id: "verified" })}
      </VerifiedConteiner>
    </InstallationProgessWrapper>
  ) : (
    <div className="font-roboto pt-[5px] text-customGreen">
      <span className="text-[13px] whitespace-nowrap font-bold mr-[15px]">
        {data?.developerName}
      </span>
      <span className="text-[13px] whitespace-nowrap font-bold">Casino</span>
    </div>
  );
}
