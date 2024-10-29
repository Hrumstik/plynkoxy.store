import CircularProgress from "@mui/material/CircularProgress";
import {
  AppImg,
  LogoContainer,
  LogoInProgressContainer,
  LogoInProgressWrapper,
} from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getInstallState,
  setFakeDownloadProgress,
  setInstallState,
} from "../../Redux/feat/InstallSlice";
import useSanity from "../../shared/hooks/useSanity";
import { RootState } from "../../Redux/store/store";
import { PWAInstallState } from "../../shared/models";

function AppLogo() {
  const installState = useSelector((state: RootState) =>
    getInstallState(state.install)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fakeInstall = async () => {
      let progress = 0;
      const startTime = Date.now();

      const interval = setInterval(() => {
        const randomIncrement = Math.random() * (30 - 10) + 10;
        progress += randomIncrement;
        progress = Math.min(progress, 100);
        progress = Math.floor(progress);

        dispatch(setFakeDownloadProgress(progress));
        const elapsedTime = (Date.now() - startTime) / 1100;

        if (progress >= 100 && elapsedTime >= 6) {
          clearInterval(interval);
          dispatch(setInstallState(PWAInstallState.downloaded));
        }
      }, 1100);
    };
    if (installState === PWAInstallState.downloading) {
      fakeInstall();
    }
  }, [installState]);

  const showPermanentCircularProgress =
    installState === PWAInstallState.downloading ||
    installState === PWAInstallState.installing;
  const showLogo =
    installState === PWAInstallState.idle ||
    installState === PWAInstallState.installed ||
    installState === PWAInstallState.downloaded;

  const { data, urlFor } = useSanity(`appIcon`);

  if (!data) return null;

  return (
    <>
      {showPermanentCircularProgress && (
        <LogoInProgressWrapper>
          <LogoInProgressContainer>
            <AppImg src={urlFor(data.appIcon)} alt="App logo" />
          </LogoInProgressContainer>

          <CircularProgress
            disableShrink
            size={58}
            thickness={2}
            sx={{
              position: "absolute",
              color: "#00875F",
            }}
          />
        </LogoInProgressWrapper>
      )}
      {showLogo && (
        <LogoContainer>
          <AppImg src={urlFor(data.appIcon)} alt="App logo" />
        </LogoContainer>
      )}
    </>
  );
}

export default AppLogo;
