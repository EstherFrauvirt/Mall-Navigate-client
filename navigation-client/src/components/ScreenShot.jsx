import React from 'react';
import html2canvas from 'html2canvas';

const ScreenshotButton = () => {
  const handleScreenshot = () => {
    const elementToCapture = document.getElementById('elementToCapture'); // Replace with the actual ID of the element

    if (elementToCapture) {
      html2canvas(elementToCapture).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'screenshot.png';
        link.click();
      });
    } else {
      console.error('Element not found');
    }
  };

  return (
    <div>
      <button onClick={handleScreenshot}>Take Screenshot</button>
      <div id="elementToCapture">
        {/* Your content to capture goes here */}
        <p>This is the content to capture</p>
      </div>
    </div>
  );
};

export default ScreenshotButton;
