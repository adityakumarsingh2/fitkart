// Size recommendation algorithm based on weight, height, and BMI

export function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
}

export function getBodyType(bmi) {
    if (bmi < 18.5) return "Slim";
    if (bmi < 25) return "Athletic";
    if (bmi < 30) return "Average";
    return "Broad";
}

export function getLengthType(height) {
    if (height < 160) return "Petite";
    if (height < 180) return "Regular";
    return "Tall";
}

export function getSizeFromBMI(bmi, height) {
    // Base size on BMI
    let baseSize;

    if (bmi < 18.5) {
        baseSize = "XS";
    } else if (bmi < 22) {
        baseSize = "S";
    } else if (bmi < 25) {
        baseSize = "M";
    } else if (bmi < 28) {
        baseSize = "L";
    } else if (bmi < 32) {
        baseSize = "XL";
    } else {
        baseSize = "XXL";
    }

    // Adjust for height if needed
    if (height < 160 && (baseSize === "M" || baseSize === "L")) {
        // Petite individuals might need a size down for better proportions
        return baseSize;
    } else if (height > 185 && (baseSize === "S" || baseSize === "M")) {
        // Tall individuals might need a size up for length
        return baseSize;
    }

    return baseSize;
}

export function getFitRecommendation(bmi) {
    if (bmi < 20) return "Slim Fit";
    if (bmi < 26) return "Regular Fit";
    return "Relaxed Fit";
}

export function generateFittingTips(measurements) {
    const { weight, height } = measurements;
    const bmi = calculateBMI(weight, height);
    const bodyType = getBodyType(bmi);
    const lengthType = getLengthType(height);
    const fitType = getFitRecommendation(bmi);

    const tips = [];

    // General fit tips
    tips.push(`${fitType} styles will complement your body type best.`);

    // Length-based tips
    if (lengthType === "Petite") {
        tips.push("Look for petite or cropped lengths to avoid overwhelming your frame.");
        tips.push("High-waisted bottoms can help elongate your legs.");
    } else if (lengthType === "Tall") {
        tips.push("Seek out tall or long length options for proper coverage.");
        tips.push("Layering works great to add visual interest.");
    } else {
        tips.push("Standard lengths should work perfectly for you.");
    }

    // Body type specific tips
    if (bodyType === "Slim") {
        tips.push("Layered looks and textured fabrics can add dimension.");
        tips.push("Fitted styles will showcase your lean physique.");
    } else if (bodyType === "Athletic") {
        tips.push("Structured pieces will highlight your proportions beautifully.");
        tips.push("Both fitted and relaxed styles will work well for you.");
    } else if (bodyType === "Average") {
        tips.push("You have great versatility - most styles will suit you well.");
        tips.push("Experiment with different fits to find your preference.");
    } else {
        tips.push("Relaxed fits with strategic tailoring will be most comfortable.");
        tips.push("Look for stretchy, breathable fabrics for all-day comfort.");
    }

    // Confidence tip
    tips.push("Remember: the best fit is one that makes you feel confident!");

    return tips;
}

export function getSizeRecommendation(measurements) {
    const { weight, height } = measurements;
    const bmi = calculateBMI(weight, height);
    const size = getSizeFromBMI(bmi, height);
    const bodyType = getBodyType(bmi);
    const lengthType = getLengthType(height);
    const fitType = getFitRecommendation(bmi);
    const tips = generateFittingTips(measurements);

    // Calculate confidence based on how "standard" the measurements are
    let confidence = 95;
    if (bmi < 16 || bmi > 35) confidence = 85; // Extreme BMI
    if (height < 150 || height > 195) confidence -= 5; // Very short or tall

    return {
        size,
        confidence,
        bmi: Math.round(bmi * 10) / 10,
        bodyType,
        fitType,
        lengthType,
        tips
    };
}
