import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Slide from '@material-ui/core/Slide';
import Slider from '@material-ui/core/Slider';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Cropper from 'react-easy-crop';
import './styles.css';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      paddingTop: '20px',
      paddingBottom: '20px',
    },
    gridList: {
      width: '600px',
      height: 'auto',
    },
    gridListTile: {
      border: '1px solid #000000',
    },
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      cursor: 'pointer',
    },
    cropContainer: {
      position: 'relative',
      width: '100%',
      height: '70vh',
      background: '#333',
    },
    controls: {
      padding: 16,
      display: 'flex',
    },
    sliderContainer: {
      display: 'flex',
      flex: '1',
      alignItems: 'center',
    },
    slider: {
      margin: 'auto 20px',
    },
    buttonContainer: {
      margin: '20px auto',
    },
    button: {
      margin: '0 50px',
      width: '110px',
    },
  }),
);
const Output = ({ croppedAreaProp, url, CROP_AREA_ASPECT }) => {
  const scale = 100 / croppedAreaProp.width;
  const transform = {
    x: `${-croppedAreaProp.x * scale}%`,
    y: `${-croppedAreaProp.y * scale}%`,
    scale,
    width: 'calc(100% )',
    height: 'auto',
  };
  const imageStyle = {
    transform: `translate3d(${transform.x}, ${
      transform.y
    }, 0) scale3d(${1},1,1)`,
    width: transform.width,
    height: transform.height,
  };

  // console.log(imageStyle, 'imageStyle');
  return (
    <div className="output" style={{ height: `${300 / CROP_AREA_ASPECT}px` }}>
      <img src={url} alt="" style={imageStyle} />
    </div>
  );
};
Output.propTypes = {
  croppedAreaProp: PropTypes.any,
  url: PropTypes.any,
  CROP_AREA_ASPECT: PropTypes.any,
};

export default function FormCropImage(props) {
  const {
    open,
    handleClose,
    editImg,
    crop,
    rotation,
    zoom,
    setCrop,
    setRotation,
    onCropComplete,
    setZoom,
    saveImage,
    aspect = 3 / 2, // Tỉ lệ khung hình
    handleDefault,
    croppedAreas,
    setCroppedAreas,
    croppedAreaPixels,
  } = props;
  const classes = useStyles();
  const marks = [
    {
      value: 0,
      label: '0°',
    },
    {
      value: 45,
      label: '45°',
    },
    {
      value: 90,
      label: '90°',
    },
    {
      value: 135,
      label: '135°',
    },
    {
      value: 180,
      label: '180°',
    },
    {
      value: 225,
      label: '225°',
    },
    {
      value: 270,
      label: '270°',
    },
    {
      value: 315,
      label: '315°',
    },
    {
      value: 360,
      label: '360°',
    },
  ];

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {/* <div className={classes.cropContainer}>
          <Cropper
            image={editImg}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            minZoom={0.5}
            maxZoom={3}
            aspect={aspect}
            zoomWithScroll={false}
            // restrictPosition={false}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onCropAreaChange={croppedArea => {
              setCroppedAreas(croppedArea);
            }}
            // objectFit="horizontal-cover"
          />
        </div> */}
        <div className="App">
          <div className="cropper">
            <Cropper
              image={editImg}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              minZoom={0.5}
              maxZoom={3}
              aspect={aspect}
              zoomWithScroll={false}
              // restrictPosition={false}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onCropAreaChange={croppedArea => {
                setCroppedAreas(croppedArea);
              }}
            />
          </div>
          <div className="viewer">
            <div>
              {croppedAreaPixels && (
                <Output
                  croppedAreaProp={croppedAreaPixels}
                  url={editImg}
                  CROP_AREA_ASPECT={aspect}
                />
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
FormCropImage.propTypes = {
  // url: PropTypes.any,
  open: PropTypes.any,
  handleClose: PropTypes.any,
  editImg: PropTypes.any,
  crop: PropTypes.any,
  rotation: PropTypes.any,
  zoom: PropTypes.any,
  setCrop: PropTypes.any,
  setRotation: PropTypes.any,
  onCropComplete: PropTypes.any,
  setZoom: PropTypes.any,
  saveImage: PropTypes.any,
  aspect: PropTypes.any,
  handleDefault: PropTypes.any,
  setCroppedAreas: PropTypes.any,
  croppedAreas: PropTypes.any,
  croppedAreaPixels: PropTypes.any,
};
