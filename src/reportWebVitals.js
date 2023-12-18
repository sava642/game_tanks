const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ tankLeftRectCLS, tankLeftRectFID, tankLeftRectFCP, tankLeftRectLCP, tankLeftRectTTFB }) => {
      tankLeftRectCLS(onPerfEntry);
      tankLeftRectFID(onPerfEntry);
      tankLeftRectFCP(onPerfEntry);
      tankLeftRectLCP(onPerfEntry);
      tankLeftRectTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
