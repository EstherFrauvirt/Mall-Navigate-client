import React, { useState } from 'react';
import html2canvas from 'html2canvas';

const ScreenshotButton = () => {
  const [screenshotData, setScreenshotData] = useState(null);

  const handleScreenshot = () => {
    const elementToCapture = document.getElementById('elementToCapture');

    if (elementToCapture) {
      html2canvas(elementToCapture).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        
        setScreenshotData(imgData);
        console.log(screenshotData);

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

      {screenshotData && (
        <div>
          <p>Screenshot saved in variable</p>
          <img src={screenshotData} alt="Screenshot" />
        </div>
      )}
    </div>
  );
};

export default ScreenshotButton;
