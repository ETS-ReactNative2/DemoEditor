/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback } from 'react';
// import { GridList, GridListTile } from '@material-ui/core';
import { ImageList, ImageListItem } from '@material-ui/core';
import FormCropImage from './FormCropImage';
import './styles.css';
import useStyle from './style';
import getCroppedImg from './cropImage';
import hinh1 from './imagge/1903623.jpg';
import hinh2 from './imagge/naruto-sasuke.jpg';
import hinh3 from './imagge/b1d192c20b12ed0f156052f5ce0ece7d.png';
import hinh4 from './imagge/image-1.png';
import hinh5 from './imagge/hp-remus-lupin-1.jpg';
import hinh6 from './imagge/hp-platform-934-hogwarts-express-1.jpg';

export default function DemoEditor() {
  const classes = useStyle();

  const [editImg, setEditImg] = useState();

  const listImg = [
    { id: 1, src: hinh1, alt: 'naruto' },
    { id: 2, src: hinh2, alt: 'sasuke' },
    { id: 3, src: hinh3, alt: 'itadori' },
    { id: 4, src: hinh4, alt: 'yonko' },
    { id: 5, src: hinh5, alt: 'luffy' },
    { id: 6, src: hinh6, alt: 'law' },
  ];
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  // const [croppedImage, setCroppedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(listImg);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixelss) => {
    setCroppedAreaPixels(croppedAreaPixelss);
  }, []);

  const saveImage = useCallback(async () => {
    try {
      const croppedImages = await getCroppedImg(
        editImg,
        croppedAreaPixels,
        rotation,
      );
      // setCroppedImage(croppedImages);
      const defaultValue = value;
      defaultValue.forEach(e => {
        if (e.src === editImg) e.src = croppedImages;
      });
      setValue(defaultValue);
      handleClose();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const handleClose = () => {
    setOpen(false);
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
  };
  const handleDefault = () => {
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
  };

  return (
    <>
      <ImageList
        // cellHeight={200}
        cols={3}
        rowHeight={160}
        className={classes.gridList}
      >
        {value.map(img => (
          // console.log(index, img, "ss");
          <ImageListItem className={classes.gridListTile} key={img.id}>
            <img
              className={classes.img}
              src={img.src}
              alt={img.alt}
              onClick={() => {
                setEditImg(img.src);
                setOpen(true);
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      {/* <Button variant="contained" component="label">
        Upload File
        <input
          type="file"
          hidden
          onChange={onFileChange}
          onClick={() => {
            // console.log('clik');
            setFile(null);
            // setEditorMedia(false);
          }}
        />
      </Button> */}
      <FormCropImage
        open={open}
        handleClose={handleClose}
        editImg={editImg}
        crop={crop}
        rotation={rotation}
        zoom={zoom}
        setCrop={setCrop}
        setRotation={setRotation}
        onCropComplete={onCropComplete}
        setZoom={setZoom}
        saveImage={saveImage}
        handleDefault={handleDefault}
      />
    </>
  );
}
