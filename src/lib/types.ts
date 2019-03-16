declare global {
  // tslint:disable-next-line:no-any
  var SplitText: any;

  interface Window {
      fits: (el: HTMLElement) => boolean;
  }
}

window.fits = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const top = rect.top + document.body.scrollTop;
  const left = rect.left + document.body.scrollLeft;
  const right = left + el.offsetWidth;
  const bottom = top + el.offsetHeight;
  const { clientWidth, clientHeight } = document.documentElement;
  return (clientHeight >= bottom && clientWidth >= right);
};

export interface PassageResponseJSON {
    passages: PassageBlock[];
}

export interface PassageBlock {
    title: string;
    verses: Array<{
        text: string;
        number: string;
    }>;
}
