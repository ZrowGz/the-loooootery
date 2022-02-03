import { createTheme } from '@material-ui/core/styles';

// creates a theme that will be imported into pages/_app App higher order component

const theme = createTheme({  
  spacing: 8,
  palette: {
    type: 'dark',
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    button: {
      default: {
        info: '#0277bd',
        submit: '#02c769',
      },
      action: {
        active: '#fff',
        hover: 'rgba(255, 255, 255, 0.08)',
        selected: 'rgba(255, 255, 255, 0.016)',
        disabled: 'rgba(255, 255, 255, 0.3)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
      },
    },
    background: {
      default: '#303030',
      black: 'black',
      paper: '#424242',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },

  MuiTypography: {
    variantMapping: {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      subtitle1: 'h2',
      subtitle2: 'h3',
      body1: 'span',
      body2: 'span',
    },
  },
});

export default theme;
