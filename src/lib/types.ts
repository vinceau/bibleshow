(window as any).fits = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const top = rect.top + document.body.scrollTop;
  const left = rect.left + document.body.scrollLeft;
  const right = left + el.offsetWidth;
  const bottom = top + el.offsetHeight;
  const { clientWidth, clientHeight } = document.documentElement;
  return (clientHeight >= bottom && clientWidth >= right);
}

declare global {
  var SplitText: any;

  interface Window {
      fits: (el: HTMLElement) => boolean;
  }
}


export interface PassageResponseJSON {
    passages: PassageBlock[];
}

export interface PassageBlock {
    title: string;
    verses: {
        [verseNumber: string]: string;
    };
}
