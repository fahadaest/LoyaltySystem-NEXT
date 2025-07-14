export const getStampLayout = (rewardQuantity) => {
    const quantity = parseInt(rewardQuantity) || 10;

    // Calculate optimal grid layout - same logic for all cases
    let cols, rows, stampSize, iconSize, gap;

    if (quantity <= 3) {
        cols = Math.min(quantity, 3);
        rows = Math.ceil(quantity / cols);
        stampSize = 54;
        iconSize = 16;
        gap = "gap-3";
    } else if (quantity <= 5) {
        cols = Math.min(quantity, 5);
        rows = Math.ceil(quantity / cols);
        stampSize = 34;
        iconSize = 15;
        gap = "gap-2";
    } else if (quantity <= 10) {
        cols = 5;
        rows = Math.ceil(quantity / cols);
        stampSize = 34;
        iconSize = 14;
        gap = "gap-2";
    } else if (quantity <= 21) {
        cols = 7;
        rows = Math.ceil(quantity / cols);
        stampSize = 26;
        iconSize = 11;
        gap = "gap-1";
    } else if (quantity <= 24) {
        cols = 8;
        rows = Math.ceil(quantity / cols);
        stampSize = 22;
        iconSize = 8;
        gap = "gap-1";
    } else if (quantity <= 27) {
        cols = 9;
        rows = Math.ceil(quantity / cols);
        stampSize = 20;
        iconSize = 6;
        gap = "gap-1";
    } else if (quantity <= 40) {
        cols = 10;
        rows = Math.ceil(quantity / cols);
        stampSize = 19;
        iconSize = 5;
        gap = "gap-0.5";
    } else if (quantity <= 60) {
        cols = 12;
        rows = Math.ceil(quantity / cols);
        stampSize = 16;
        iconSize = 5;
        gap = "gap-0.5";
    } else if (quantity <= 84) {
        cols = 14;
        rows = Math.ceil(quantity / cols);
        stampSize = 14;
        iconSize = 5;
        gap = "gap-0.5";
    } else {
        cols = 22;
        rows = Math.ceil(quantity / cols);
        stampSize = 8;
        iconSize = 4;
        gap = "gap-0.5";
    }

    return { cols, rows, stampSize, iconSize, quantity, gap };
};