/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback } from 'react';
// import Button from '@material-ui/core/Button';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
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

// function readFile(file) {
//   return new Promise(resolve => {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => resolve(reader.result), false);
//     reader.readAsDataURL(file);
//   });
// }

export default function DemoEditor() {
  const classes = useStyle();

  const [editImg, setEditImg] = useState();
  // const [file, setFile] = useState([]);
  // const onFileChange = async e => {
  //   // console.log('imageDataUrl1');

  //   if (e.target.files && e.target.files.length > 0) {
  //     const fileUpload = e.target.files[0];
  //     const validImageTypes = [
  //       'image/svg+xml',
  //       'image/jpeg',
  //       'image/png',
  //       'image/webp',
  //     ];
  //     // console.log(
  //     //   'imageDataUrl',
  //     //   fileUpload,
  //     //   validImageTypes.includes(fileUpload.type),
  //     // );

  //     if (validImageTypes.includes(fileUpload.type)) {
  //       // console.log('fileRender', fileUpload, file);

  //       const imageDataUrl = await readFile(fileUpload);
  //       let fileRender;
  //       console.log(file !== null);
  //       if (file !== null) {
  //         fileRender = [
  //           {
  //             src: imageDataUrl,
  //             alt: fileUpload.name,
  //           },
  //           ...file,
  //         ];
  //         console.log('fileRender', fileRender);
  //       } else {
  //         fileRender = [
  //           {
  //             src: imageDataUrl,
  //             alt: fileUpload.name,
  //           },
  //         ];
  //       }
  //       console.log('fileRender', fileRender);

  //       setFile(fileRender);
  //       // setImageUrl(imageDataUrl);
  //     } else {
  //       alert('Uploaded files must be an image (e.g. .jpeg, .png, .svg)');
  //     }
  //   }
  // };

  const listImg = [
    {
      src: hinh1,
      alt: 'naruto',
    },
    {
      src: hinh2,
      alt: 'sasuke',
    },
    {
      src: hinh3,
      alt: 'itadori',
    },
    {
      src: hinh4,
      alt: 'yonko',
    },
    {
      src: hinh5,
      alt: 'luffy',
    },
    {
      src: hinh6,
      alt: 'law',
    },
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
      // console.log('donee', { croppedImages });
      // setCroppedImage(croppedImages);
      const defaultValue = value;
      defaultValue.forEach(e => {
        if (e.src === editImg) e.src = croppedImages;
      });
      setValue(defaultValue);
      handleClose();
    } catch (e) {
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
      <GridList cellHeight={200} cols={3} className={classes.gridList}>
        {value.map(img => (
          // console.log(index, img, "ss");
          <GridListTile className={classes.gridListTile}>
            <img
              className={classes.img}
              src={img.src}
              alt={img.alt}
              onClick={() => {
                setEditImg(img.src);
                setOpen(true);
              }}
            />
          </GridListTile>
        ))}
      </GridList>
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
