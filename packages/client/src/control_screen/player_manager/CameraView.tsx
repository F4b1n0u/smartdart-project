import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';

const CameraWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WebcamContainer = styled.div`
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 10px;

  & video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CaptureButton = styled.button`
  margin-top: 10px;
`;

const CameraView = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    if (onCapture) {
      onCapture(imageSrc);
    }
  };

  return (
    <CameraWrapper>
      <WebcamContainer>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="200"
          height="200"
        />
      </WebcamContainer>
      <CaptureButton onClick={capture}>Capture Photo</CaptureButton>
      {capturedImage && <img src={capturedImage} alt="Captured" />}
    </CameraWrapper>
  );
};

export default CameraView;