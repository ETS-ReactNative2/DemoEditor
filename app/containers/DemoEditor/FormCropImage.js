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
    aspect = 3 / 3,
    handleDefault,
  } = props;
  const classes = useStyles();

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className={classes.cropContainer}>
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
          />
        </div>
        <div className={classes.controls}>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              {' '}
              Zoom{' '}
            </Typography>
            <Slider
              value={zoom}
              min={0.5}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              className={classes.slider}
              onChange={(e, onZoom) => setZoom(onZoom)}
            />
          </div>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              {' '}
              Rotation{' '}
            </Typography>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              className={classes.slider}
              // onChange={(e, rotation) => setRotation(rotation)}
            />
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <Button
            onClick={saveImage}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {' '}
            Save{' '}
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {' '}
            Cancel{' '}
          </Button>
          <Button
            onClick={handleDefault}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {' '}
            Default{' '}
          </Button>
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
};
