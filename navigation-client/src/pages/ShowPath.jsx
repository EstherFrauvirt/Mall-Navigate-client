import React, { useState, useEffect } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



export default function ShowPath({ matrix, coordinates }) {
    const [coloredMatrix, setColoredMatrix] = useState(() => colorCoordinates(matrix, coordinates));
    const [index, setIndex] = useState(0);

    function colorCoordinates(matrix, coordinates) {
        const numRows = matrix.length;
        const numCols = matrix[0].length;

        const newColoredMatrix = matrix.map(row => [...row]);

        for (let i = 0; i < coordinates.length; i++) {
            const [row, col] = coordinates[i];
            if (row >= 0 && row < numRows && col >= 0 && col < numCols) {
                newColoredMatrix[row][col] = 'red';
            }
        }

        return newColoredMatrix;
    }

    useEffect(() => {
        if (index < coordinates.length) {
            const [row, col] = coordinates[index];
            setColoredMatrix(prevMatrix => {
                const newMatrix = prevMatrix.map(row => [...row]);
                newMatrix[row][col] = 'red';
                return newMatrix;
            });

            // Increment the index after a half-second delay
            const timeoutId = setTimeout(() => {
                setIndex(prevIndex => prevIndex + 1);
            }, 500);

            // Clear the timeout when the component unmounts
            return () => clearTimeout(timeoutId);
        }
    }, [index, coordinates]);

    return (
        <div>
            <table>
                <tbody>
                    {coloredMatrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex} style={{ backgroundColor: cell }}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


