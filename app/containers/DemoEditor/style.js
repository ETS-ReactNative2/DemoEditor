import makeStyles from '@material-ui/core/styles/makeStyles';

// biến style: a1b2 = 1/2
const a1b2 = '50%';
const a1b3 = 'calc(100% / 3)';
const a2b3 = 'calc(100% * 2 / 3)';

const itemSpacing = 0.25; // khoảng cách giữa các albumItem

/* styled dành cho album */
export default makeStyles(theme => ({
  albumContainer: {
    width: '100%',
    paddingTop: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    cursor: 'pointer',
  },
  albumInfo: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    // zIndex: 2,
    textAlign: 'center',
    padding: theme.spacing(3),
    color: theme.palette.common.white,
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.3) 0, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.2) 75%, rgba(0, 0, 0, 0) 100%)`,
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    textShadow: `0px 1px 2px rgb(0 0 0 / 50%)`,
  },
  albumList: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin: `-${theme.spacing(itemSpacing)}px`,
  },
  albumGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  albumItem: {
    position: 'relative',
    float: 'left',
    padding: theme.spacing(itemSpacing),
  },
  /* image */
  albumTypeImage: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    backgroundColor: theme.palette.common.white,
  },
  /* video */
  albumTypeVideo: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    backgroundColor: theme.palette.common.white,
  },
  albumPlayIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.spacing(8),
    color: theme.palette.background.paper,
    '& svg': {
      fontSize: 'inherit',
    },
  },
  albumCount: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: itemSpacing,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.typography.h4.fontSize,
    color: theme.palette.common.white,
    backgroundColor: 'rgba(0, 0, 0, 0.54)',
    transition: '.5s',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },

  /* ALBUM CASES */
  /* một ảnh */
  album_1: {
    paddingTop: 0,
    maxHeight: theme.spacing(80),
    overflow: 'hidden',
    '& img': {
      objectPosition: 'top center',
    },
  },
  /* 2 ảnh đứng */
  album_2v: {
    '& [role="listitem"]': {
      width: a1b2,
      height: '100%',
    },
  },
  /* 2 ảnh ngang */
  album_2h: {
    '& [role="listitem"]': {
      width: '100%',
      height: a1b2,
    },
  },
  /* 2 ảnh vuông */
  album_2d: {
    paddingTop: '50%',
    '& [role="listitem"]': {
      width: a1b2,
      height: '100%',
    },
  },
  /* 3 ảnh đứng */
  album_3v: {
    '& [role="listitem"]': {
      width: a1b3,
      height: a1b2,
      '&:first-of-type': {
        width: a2b3,
        height: '100%',
      },
    },
  },
  /* 3 ảnh ngang */
  album_3h: {
    '& [role="listitem"]': {
      width: a1b2,
      height: a1b3,
      '&:first-of-type': {
        width: '100%',
        height: a2b3,
      },
    },
  },
  /* 4 ảnh đứng */
  album_4v: {
    '& [role="listitem"]': {
      width: a1b3,
      height: a1b3,
      '&:first-of-type': {
        width: a2b3,
        height: '100%',
      },
    },
  },
  /* 4 ảnh ngang */
  album_4h: {
    '& [role="listitem"]': {
      width: a1b3,
      height: a1b3,
      '&:first-of-type': {
        width: '100%',
        height: a2b3,
      },
    },
  },
  /* 4 ảnh vuông */
  album_4d: {
    '& [role="listitem"]': {
      width: a1b2,
      height: a1b2,
    },
  },
  /* 5 ảnh đứng */
  album_5v: {
    '& [role="listitem"]': {
      width: a1b2,
      height: a2b3,
      '&:nth-of-type(n+3)': {
        width: a1b3,
        height: a1b3,
      },
    },
  },
  /* 5 ảnh ngang */
  album_5h: {
    '& [role="listitem"]': {
      width: a1b2,
      height: a1b2,
      '&:nth-of-type(n+3)': {
        height: a1b3,
      },
    },
  },
  previewAlbum: {
    position: 'relative',
  },
  previewToolbar: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: theme.spacing(0.5, 1),
    flexWrap: 'wrap',
    backgroundColor: 'rgb(255 255 255 / 25%)',
    borderRadius: 99,
    margin: theme.spacing(1),
    minHeight: 'auto',
    boxShadow: theme.shadows[1],
  },
  removeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexWrap: 'wrap',
    borderRadius: 99,
    margin: theme.spacing(1),
    minHeight: 'auto',
    boxShadow: theme.shadows[1],
  },
  closeAlbumButton: {
    // marginLeft: 'auto',
  },
}));
