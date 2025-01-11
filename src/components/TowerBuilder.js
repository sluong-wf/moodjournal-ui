import { useTheme } from '@mui/material/styles';
import React, { useRef, useEffect, useState } from 'react';

const TowerBuilder = () => {
    const canvasRef = useRef(null);
    const theme = useTheme();

    const blockHeight = 20;
    const [blocks, setBlocks] = useState([]);
    const [currentBlock, setCurrentBlock] = useState({
        x: 0,
        width: 50,
        height: blockHeight,
        speedX: 5,
        placed: false,
    });
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            blocks.forEach((block) => {
                ctx.fillStyle = 'black';
                ctx.fillRect(block.x, canvas.height - block.height, block.width, blockHeight);
            });

            ctx.fillStyle = 'black';
            ctx.fillRect(currentBlock.x, canvas.height - currentBlock.height, currentBlock.width, blockHeight);

            if (isGameOver) {
                ctx.fillStyle = 'rgba(120, 120, 120, 0.7)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = 'white';
                ctx.font = '30px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('Game Over', canvas.width / 2, canvas.height / 3 + 30);
                ctx.font = '15px monospace';
                ctx.fillText('Click anywhere to restart', canvas.width / 2, canvas.height / 2 + 10);
            }
        };

        const update = () => {
            setCurrentBlock(prevBlock => {
                if (prevBlock.placed) {
                    const blockLeft = prevBlock.x;
                    const blockRight = blockLeft + prevBlock.width;
                    const lastBoxIdx = blocks.length - 1
                    if (lastBoxIdx >= 0 && (blockRight <= (blocks[lastBoxIdx].x) || blockLeft >= (blocks[lastBoxIdx].x + blocks[lastBoxIdx].width))) {
                        setIsGameOver(true);
                        return prevBlock;
                    }
                    setBlocks([...blocks, prevBlock]);
                    return createNewBlock(canvas.width, prevBlock.height);
                } else {
                    const nextX = prevBlock.x + prevBlock.speedX;
                    const nextSpeedX = nextX + prevBlock.width > canvas.width || nextX < 0 ? -prevBlock.speedX : prevBlock.speedX;

                    return { ...prevBlock, x: nextX, speedX: nextSpeedX };
                }
            });
        };

        const interval = setInterval(() => {
            if (!isGameOver) {
                update();
            };
            draw();
        }, 30);

        return () => clearInterval(interval);
    }, [blocks, currentBlock, isGameOver]);

    const handleCanvasClick = () => {
        if (isGameOver) {
            restartGame();
        } else if (!currentBlock.placed) {
            setCurrentBlock(prev => ({ ...prev, placed: true }));
        };
    };

    const createNewBlock = (canvasWidth, prevHeight) => {
        const newWidth = Math.max(20, currentBlock.width - 5); // Shrink width for difficulty
        const randomX = Math.random() * (canvasWidth - newWidth);
        const randomSpeedX = (Math.random() > 0.5 ? 5 : -5) * (1 + (blocks.length / 5));

        return {
            x: randomX,
            width: newWidth,
            height: prevHeight + blockHeight,
            speedX: randomSpeedX,
            placed: false,
        };
    };

    const restartGame = () => {
        setBlocks([]);
        setCurrentBlock({
            x: 0,
            width: 50,
            height: blockHeight,
            speedX: 5,
            placed: false,
        });
        setIsGameOver(false);
    };

    return (
        <div style={{ textAlign: 'center', fontFamily: 'monospace' }}>
            <h1>Tower Stack 101</h1>
            <canvas
                ref={canvasRef}
                width={300}
                height={400}
                style={{
                    border: '1px solid black',
                    background: 'white',
                    imageRendering: 'pixelated',
                    fontFamily: 'monospace',
                }}
                onClick={handleCanvasClick}
            />
            <h2>Score: {blocks.length}</h2>
        </div>
    );
};

// Button styling
const buttonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    background: 'black',
    color: 'white',
    border: '2px solid black',
};

export default TowerBuilder;
