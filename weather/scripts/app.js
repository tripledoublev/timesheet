
function drawLine(ctx, begin, end, stroke = 'black', width = 1, shadowB, shadowC, offSetX) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
    ctx.shadowBlur = shadowB;
    ctx.shadowColor = shadowC;
    ctx.shadowOffsetX = offSetX;
}


