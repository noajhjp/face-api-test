import {useEffect, useRef} from 'react';
import * as faceapi from 'face-api.js';

const imgPath =['https://images.pexels.com/photos/415263/pexels-photo-415263.jpeg', 'https://images.pexels.com/photos/923657/pexels-photo-923657.jpeg', 'https://images.pexels.com/photos/2105199/pexels-photo-2105199.jpeg']
const Face = () => {
  const imgRef: any = useRef()
  const canvasRef: any = useRef()

  const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

    console.log(detections)
  }
  
  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]).then(handleImage).catch((e)=>console.log(e))
    }
    imgRef.current && loadModels()
  }, [])

  return (
    <div className="face" style={{display: 'flex'}}>
      <img ref={imgRef} crossOrigin={'anonymous'}  src={imgPath[1]} alt="face-img" width={940} height={650}/>
      <canvas ref={canvasRef} style={{position: 'absolute', left: 0, width: 940, height: 650}} />
    </div>
  )
}

export default Face