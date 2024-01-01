function createCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

function getImageData(image: HTMLImageElement): ImageData | null {
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext('2d');
    if (context) {
        context.drawImage(image, 0, 0);
        return context.getImageData(0, 0, image.width, image.height);
    }
    return null;
}

function generatePixelArt(inputImage: HTMLImageElement, pixelSize: number): HTMLCanvasElement | null {
    const imageData = getImageData(inputImage);
    if (!imageData) return null;

    const { width, height, data: pixels } = imageData;

    for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
            let total = [0, 0, 0];

            for (let blockY = 0; blockY < pixelSize; blockY++) {
                for (let blockX = 0; blockX < pixelSize; blockX++) {
                    const index = ((y + blockY) * width + (x + blockX)) * 4;

                    total[0] += pixels[index];
                    total[1] += pixels[index + 1];
                    total[2] += pixels[index + 2];
                }
            }

            const avg = total.map(val => Math.floor(val / (pixelSize * pixelSize)));
            
            for (let blockY = 0; blockY < pixelSize; blockY++) {
                for (let blockX = 0; blockX < pixelSize; blockX++) {
                    const index = ((y + blockY) * width + (x + blockX)) * 4;

                    pixels[index] = avg[0];
                    pixels[index + 1] = avg[1];
                    pixels[index + 2] = avg[2];
                }
            }
        }
    }

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    if (context) {
        context.putImageData(imageData, 0, 0);
        return canvas;
    }
    return null;
}

const inputImage = new Image();
inputImage.onload = () => {
    const pixelArtCanvas = generatePixelArt(inputImage, 10);
    if (pixelArtCanvas) {
        document.body.appendChild(pixelArtCanvas);
    } else {
        console.error('Failed to generate pixel art canvas.');
    }
};
inputImage.src = 'input_image.jpg';
