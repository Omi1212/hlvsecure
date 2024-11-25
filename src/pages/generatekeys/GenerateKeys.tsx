import React, { useEffect, useState } from "react";
import Title from "../../components/Title/Title";
import QRCode from "qrcode.react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Button } from "@nextui-org/react";
import { getFromLocalStorage } from "@/utils/storageUtils";
import { decode } from "punycode";
import { decodeToken } from "@/utils/decodeToken";
import { generateKey } from "@/services/generateKey";

const GenerateKeys = () => {
  const initialQrCode = localStorage.getItem("qrCode") || "";
  const initialGraceTime = localStorage.getItem("graceTime") || "00:00";
  const initialCreationTime = localStorage.getItem("creationTime") || "";
  const initialCreationTimeInSeconds =
    parseInt(localStorage.getItem("creationTimeInSeconds"), 10) || 0;
  const totalGraceTime =
    parseInt(localStorage.getItem("totalGraceTime"), 10) || 0;

  // Calculate the initial time left
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  function convertToSeconds(timeStr) {
    if (!timeStr) return 0;
    const parts = timeStr.split(":").map(Number);
    if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      return hours * 3600 + minutes * 60 + seconds;
    } else if (parts.length === 2) {
      const [hours, minutes] = parts;
      return hours * 3600 + minutes * 60;
    } else if (parts.length === 1) {
      return parts[0];
    }
    return 0;
  }

  const graceTimeSeconds = convertToSeconds(initialGraceTime);
  let initialTimeLeft = initialGraceTime
    ? graceTimeSeconds - (totalSeconds - initialCreationTimeInSeconds)
    : 0;

  if (initialTimeLeft < 0) {
    initialTimeLeft = 0;
  }

  const [qrCode, setQrCode] = useState(initialQrCode);
  const [showButton, setShowButton] = useState(!initialQrCode);
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [key, setKey] = useState("");
  const [graceTime, setGraceTime] = useState(initialGraceTime);
  const [creationTime, setCreationTime] = useState(initialCreationTime);

  console.log(`Total de segundos desde la medianoche: ${totalSeconds}`);

  useEffect(() => {
    // Check if totalGraceTime has expired
    if (totalSeconds > totalGraceTime) {
      setShowButton(true);
      setQrCode("");
      localStorage.removeItem("qrCode");
      localStorage.removeItem("timeLeft");
      localStorage.removeItem("graceTime");
      localStorage.removeItem("creationTime");
      localStorage.removeItem("totalGraceTime");
      localStorage.removeItem("creationTimeInSeconds");
    }

    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem("timeLeft", newTime.toString());
          return newTime;
        });
      } else if (timeLeft === 0 && qrCode) {
        setShowButton(true);
        setQrCode("");
        localStorage.removeItem("qrCode");
        localStorage.removeItem("timeLeft");
        localStorage.removeItem("graceTime");
        localStorage.removeItem("creationTime");
        localStorage.removeItem("totalGraceTime");
        localStorage.removeItem("creationTimeInSeconds");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, qrCode, totalGraceTime, totalSeconds]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const getGenerateKey = async () => {
    const emailUser = decodeToken()?.email;
    console.log("Email user:", emailUser);

    try {
      const { key, graceTime, creationTime } = await generateKey(emailUser);

      const creationSeconds = convertToSeconds(creationTime);
      const graceTimeSeconds = convertToSeconds(graceTime);
      const totalGraceTime = creationSeconds + graceTimeSeconds;

      setQrCode(key);
      setGraceTime(graceTime);
      setCreationTime(creationTime);
      setTimeLeft(graceTimeSeconds);

      localStorage.setItem("qrCode", key);
      localStorage.setItem("timeLeft", graceTimeSeconds.toString());
      localStorage.setItem("graceTime", graceTime);
      localStorage.setItem("creationTime", creationTime);
      localStorage.setItem("totalGraceTime", totalGraceTime.toString());
      localStorage.setItem("creationTimeInSeconds", creationSeconds.toString());

      setShowButton(false);
    } catch (error) {
      console.error("Error generating key:", error);
    }
  };

  return (
    <div className="container-tab">
      <Title
        title="Generate Key"
        description="For your safety, do not share this key with anyone"
      />

      <div className="mt-10">
        {showButton ? (
          <Button
            variant="flat"
            className="bg-zinc-700 text-white"
            onClick={getGenerateKey}
          >
            Generate QR code
          </Button>
        ) : (
          <>
            <div className="flex justify-center items-center flex-col gap-4">
              <QRCode size={250} value={qrCode} />
              <label className="text-gray-600">
                The QR code will expire in:{" "}
                <span className="text-red-500">{formatTime(timeLeft)}</span>
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GenerateKeys;
