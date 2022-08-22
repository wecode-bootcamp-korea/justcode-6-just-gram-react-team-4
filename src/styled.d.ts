import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      body: string;
      loginButton: string;
      line: string;
      text: string;
      subText: string;
      header: string;
      input: string;
      placeholder: string;
      loginInput: string;
      feed: string;
      disabledBtn: string;
      loginText: string;
      modalBg: string;
      skeletonGrad: {
        side: string;
        center: string;
      };
    };
  }
}
