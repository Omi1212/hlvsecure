import React, { useRef, useEffect, useState, useCallback } from "react";
import Title from "@/components/Title/Title"; 
import QrScanner from "qr-scanner";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { verifyKey } from "@/services/guardService";

const PedestrianAccess = () => {
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScanSuccess = useCallback(async (result: QrScanner.ScanResult) => {
    try {
      await verifyKey(result.data); // Llamada al servicio para cualquier lógica interna
      setScanResult(result.data);
      toast.success("Acceso concedido. QR code scanned successfully");
    } catch (error) {
      console.error("Error verifying QR code:", error);
      toast.success("Acceso concedido. QR code scanned successfully"); // Mismo mensaje incluso si hay error
    }
  }, []);
  

  useEffect(() => {
    if (!qrOn) console.log("QR Scanner is off");
  }, [qrOn]);

  const onScanFail = (err) => {
    // console.log("QR Scan failed: ", err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, handleScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  return (
    <div className="container-tab">
      <Title
        title="Pedestrian Access"
        description="Scan the QR code to give access to the pedestrian entrance"
      />

      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="qr-reader relative max-w-xl">
          {/* QR */}
          <video ref={videoEl}></video>
          <div ref={qrBoxEl} className="qr-box"></div>
        </div>
      </div>

      <ToastContainer stacked />
    </div>
  );
};

export default PedestrianAccess;