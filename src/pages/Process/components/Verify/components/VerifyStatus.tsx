import React from "react";
import { useTranslation } from "react-i18next";
import { VerifyStatus } from "./VerifyCard";
import { Container, Text } from "@component-library/index";

interface ProcessVerifyStatusProps {
  status: VerifyStatus;
}

const ProcessVerifyStatus: React.FC<ProcessVerifyStatusProps> = (props) => {
  const { status } = props;
  const { t } = useTranslation();

  const gray = "fill-gray-300";
  const blue = "fill-blue-700";
  const green = "fill-green-700";
  const red = "fill-red-700";

  const getClassNameFirst = (): string => {
    switch (status) {
      case VerifyStatus.READY:
        return gray;
      case VerifyStatus.STARTED:
        return blue;
      case VerifyStatus.ONGOING:
        return blue;
      case VerifyStatus.COMPLETED:
        return green;
      case VerifyStatus.FAILED:
        return red;
      default:
        return gray;
    }
  };
  const getClassNameSecond = (): string => {
    switch (status) {
      case VerifyStatus.READY:
        return gray;
      case VerifyStatus.STARTED:
        return gray;
      case VerifyStatus.ONGOING:
        return blue;
      case VerifyStatus.COMPLETED:
        return green;
      case VerifyStatus.FAILED:
        return red;
      default:
        return gray;
    }
  };

  const getClassNameThird = (): string => {
    switch (status) {
      case VerifyStatus.READY:
        return gray;
      case VerifyStatus.STARTED:
        return gray;
      case VerifyStatus.ONGOING:
        return gray;
      case VerifyStatus.COMPLETED:
        return green;
      case VerifyStatus.FAILED:
        return red;
      default:
        return gray;
    }
  };

  return (
    <Container width="full" className="relative">
      <Text className="absolute bottom-auto left-auto right-auto top-auto">
        {t(
          `Process.components.Verify.components.VerifyStatus.${
            VerifyStatus[status] as keyof typeof VerifyStatus
          }`
        )}
      </Text>
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.25 11.9356C31.0074 9.78329 31.7385 7.01452 33.9778 5.93664C41.1285 2.49483 48.9051 0.499128 56.8598 0.0822367C66.3155 -0.413317 75.7542 1.33604 84.4042 5.18727C93.0542 9.0385 100.67 14.8823 106.629 22.2408C111.642 28.4312 115.362 35.5458 117.589 43.1627C118.287 45.5482 116.718 47.9442 114.287 48.4609C111.856 48.9776 109.486 47.4177 108.757 45.0417C106.846 38.8113 103.753 32.991 99.6344 27.9046C94.5695 21.6499 88.0961 16.6827 80.7436 13.4092C73.391 10.1356 65.3682 8.64868 57.3309 9.0699C50.795 9.41244 44.4004 11.0089 38.4913 13.7574C36.2378 14.8056 33.4926 14.0879 32.25 11.9356Z"
          className={getClassNameFirst()}
        />
        <path
          d="M115.5 60C117.985 60 120.018 62.0176 119.831 64.4958C119.237 72.4094 117.077 80.142 113.46 87.2394C109.162 95.676 102.927 102.976 95.2671 108.541C87.6069 114.107 78.7381 117.78 69.3861 119.261C61.5185 120.507 53.4969 120.172 45.7869 118.292C43.3724 117.704 42.0816 115.147 42.8496 112.784C43.6176 110.42 46.1536 109.147 48.5757 109.704C54.9272 111.164 61.5139 111.396 67.9782 110.372C75.9274 109.113 83.4658 105.991 89.9771 101.26C96.4883 96.5292 101.787 90.3246 105.441 83.1535C108.413 77.322 110.227 70.986 110.802 64.4942C111.021 62.0186 113.015 60 115.5 60Z"
          className={getClassNameSecond()}
        />
        <path
          d="M32.25 108.064C31.0074 110.217 28.244 110.968 26.1908 109.568C19.6348 105.096 14.0182 99.3589 9.67978 92.6783C4.52279 84.7373 1.31844 75.6885 0.328698 66.2717C-0.661042 56.855 0.591936 47.3376 3.98519 38.4979C6.83981 31.0614 11.141 24.282 16.624 18.545C18.3411 16.7483 21.2003 16.9085 22.8633 18.7555C24.5262 20.6024 24.3605 23.435 22.6673 25.2543C18.2272 30.0249 14.7329 35.6131 12.3874 41.7232C9.50315 49.237 8.43812 57.3267 9.2794 65.331C10.1207 73.3352 12.8444 81.0267 17.2278 87.7766C20.7924 93.2656 25.3722 98.0052 30.7071 101.748C32.7415 103.176 33.4926 105.912 32.25 108.064Z"
          className={getClassNameThird()}
        />
      </svg>
    </Container>
  );
};

export default ProcessVerifyStatus;
