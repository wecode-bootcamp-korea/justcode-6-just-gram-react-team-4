import { DefaultTheme } from 'styled-components';

export const light: DefaultTheme = {
  colors: {
    body: '#eeeeee',
    text: 'black',
    header: 'white',
    line: 'lightgray',
    feed: 'white',
    input: '#eeeeee',
    placeholder: '#666666',
    loginInput: 'white',
    loginButton: 'blue',
    disabledBtn: 'lightskyblue',
    loginText: 'white',
    modalBg: 'white',
    skeletonGrad: {
      side: '#ffffff00',
      center: '#ffffff',
    },
  },
};

const dark: DefaultTheme = {
  colors: {
    body: '#222222',
    text: 'white',
    header: '#333333',
    line: '#777777',
    feed: '#333333',
    input: '#666666',
    placeholder: '#eeeeee',
    loginInput: '#444444',
    loginButton: '#888888',
    disabledBtn: '#555555',
    loginText: '#999999',
    modalBg: '#555555',
    skeletonGrad: {
      side: '#33333300',
      center: '#333333',
    },
  },
};

export default { light, dark };
