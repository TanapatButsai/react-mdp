import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceDetection from '@mediapipe/face_detection';
import * as cam from '@mediapipe/camera_utils';
import { drawRectangle } from '../utills/drawingUtils';

const FaceTracking = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const faceMesh = new faceDetection.FaceDetection({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
      }
    });

    faceMesh.setOptions({
      modelSelection: 0,
      minDetectionConfidence: 0.5
    });

    faceMesh.onResults(onResults);

    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      const camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480
      });
      camera.start();
      setCamera(camera);
    }

    return () => {
      if (camera) camera.stop();
    };
  }, []);

  const onResults = (results) => {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height
    );

    if (results.detections.length > 0) {
      results.detections.forEach((detection) => {
        const bbox = detection.boundingBox;
        drawRectangle(
          canvasCtx,
          bbox.xMin * videoWidth,
          bbox.yMin * videoHeight,
          bbox.width * videoWidth,
          bbox.height * videoHeight
        );
      });
    }

    canvasCtx.restore();
  };

  return (
    <div className="face-tracking">
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
};

export default FaceTracking;