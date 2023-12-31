import { useState } from 'react'
import './App.css'
import Matrix from './components/matrix'
import BuildMatrix from './components/buildMatrix'
import { BrowserRouter, Link } from 'react-router-dom'
import AppRoutes from './components/routers/appRouters'
import Home from './components/admin'
import { MallProvider } from './components/context/mallContext'
import { ModalProvider } from './components/context/modalContext'


function App() {
  return (
    <>
      <ModalProvider>
        <MallProvider>
          <BrowserRouter>
            <AppRoutes />

          </BrowserRouter>
        </MallProvider>
      </ModalProvider>
    </>
  )
}

export default App


// import React, { useEffect, useRef } from 'react';

// const MatrixWithRedLine = ({ matrixSize, redCoordinate, cellSize }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     // Clear the canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Draw the green background
//     ctx.fillStyle = 'green';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Draw a red line at the center of the specified cell
//     const [cellX, cellY] = redCoordinate;
//     const x = cellX * cellSize + cellSize / 2;
//     const y = cellY * cellSize + cellSize / 2;

//     ctx.strokeStyle = 'red';
//     ctx.lineWidth = 2;
//     ctx.beginPath();
//     ctx.moveTo(x, y + (cellSize/2));
//     ctx.lineTo(x, y - (cellSize/2));
//     ctx.stroke();
//   }, [redCoordinate, cellSize, matrixSize]);

//   return <canvas ref={canvasRef} width={matrixSize[0] * cellSize} height={matrixSize[1] * cellSize} />;
// };

// // Example usage
// const matrixSize = [10, 10]; // Adjust the size of your matrix as needed
// const specificCell = [9, 9]; // Adjust the coordinate of the specific cell
// const cellSize = 30; // Adjust the cell size as needed

// const App = () => {
//   return <MatrixWithRedLine matrixSize={matrixSize} redCoordinate={specificCell} cellSize={cellSize} />;
// };

// export default App;

