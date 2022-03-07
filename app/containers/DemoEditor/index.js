/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback } from 'react';
// import { GridList, GridListTile } from '@material-ui/core';
import { ImageList, ImageListItem } from '@material-ui/core';
import FormCropImage from './FormCropImage';
import './styles.css';
import useStyle from './style';
import getCroppedImg from './cropImage';
import hinh1 from './imagge/dalat1-1629610847.jpg';
import hinh2 from './imagge/naruto-sasuke.jpg';
import hinh3 from './imagge/b1d192c20b12ed0f156052f5ce0ece7d.png';
import hinh4 from './imagge/image-1.png';
import hinh5 from './imagge/hp-remus-lupin-1.jpg';
import hinh6 from './imagge/hp-platform-934-hogwarts-express-1.jpg';

export default function DemoEditor() {
  const classes = useStyle();

  const [editImg, setEditImg] = useState();

  const listImg = [
    {
      id: 1,
      src: hinh1,
      alt: 'naruto',
      imgEdited: hinh1,
      coordinates: null,
    },
    {
      id: 2,
      src: hinh2,
      alt: 'sasuke',
      imgEdited: hinh2,
      coordinates: null,
      edited: false,
    },
    {
      id: 3,
      src: hinh3,
      alt: 'itadori',
      imgEdited: hinh3,
      coordinates: null,
      edited: false,
    },
    {
      id: 4,
      src: hinh4,
      alt: 'yonko',
      imgEdited: hinh4,
      coordinates: null,
      edited: false,
    },
    {
      id: 5,
      src: hinh5,
      alt: 'luffy',
      imgEdited: hinh5,
      coordinates: null,
      edited: false,
    },
    {
      id: 6,
      src: hinh6,
      alt: 'law',
      imgEdited: hinh6,
      coordinates: null,
      edited: false,
    },
  ];
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(listImg);
  const [coordinatesDefaults, setCoordinatesDefaults] = useState(null);
  const [croppedAreas, setCroppedAreas] = useState(null);

  React.useEffect(() => {
    if (coordinatesDefaults !== croppedAreaPixels) {
      setCoordinatesDefaults(croppedAreaPixels);
    }
  }, [croppedAreaPixels]);
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
      const xd = coordinatesDefaults.x || 0;
      const yd = coordinatesDefaults.y || 0;
      const wd = coordinatesDefaults.width || 0;
      const hd = coordinatesDefaults.height || 0;
      const { x, y, width, height } = croppedAreaPixels;
      const ybs = 2 * yd + wd - width - y;
      const xbs = 2 * xd + hd - height - x;
      // console.log(
      //   x,
      //   y,
      //   width,
      //   height,
      //   croppedAreaPixels,
      //   ybs,
      //   xbs,
      //   'x, y, width, height, croppedAreaPixels',
      // );

      const coordinates = [
        {
          x: -croppedAreaPixels.width / 2 - xd + x,
          y: croppedAreaPixels.height / 2 + yd - y,
        },
        {
          x: croppedAreaPixels.width / 2 + xd - x,
          y: croppedAreaPixels.height / 2 + yd - ybs,
        },
        {
          x: croppedAreaPixels.width / 2 + xd - xbs,
          y: -croppedAreaPixels.height / 2 - yd + ybs,
        },
        {
          x: -croppedAreaPixels.width / 2 - xd + xbs,
          y: -croppedAreaPixels.height / 2 - yd + y,
        },
      ];
      const result = value;
      result.forEach(e => {
        if (e.src === editImg) {
          e.imgEdited = croppedImages;
          e.coordinates = coordinates;
          e.edited = true;
          e.coordinates = coordinates;
        }
      });
      setValue(result);
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
              src={img.imgEdited}
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
        setCroppedAreas={setCroppedAreas}
        croppedAreas={croppedAreas}
        croppedAreaPixels={croppedAreaPixels}
        // aspect={aspect} Tỉ lệ crop
      />
    </>
  );
}
