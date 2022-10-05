
function drawLine(ctx, begin, end, stroke, width, shadowB, shadowC, offSetX) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }
    if (shadowB) {
        ctx.shadowBlur = shadowB;
    }
    if (shadowC) {
        ctx.shadowColor = shadowC;
    }
    if (offSetX) {
        ctx.shadowOffsetX = offSetX;
    }
    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
    
}


