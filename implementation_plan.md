# Try-On Weight/Height Integration Plan

## Goal Description
Enhance the Try-On page to collect user weight and height measurements (if not already provided in their profile), save this data to their profile for future use, and use these measurements to provide accurate size recommendations and fitting tips.

## User Review Required

> [!IMPORTANT]
> **One-Time Prompt**: Weight and height will only be asked once. If the user has already provided this information in their profile, they won't be prompted again on the Try-On page.

> [!IMPORTANT]
> **Profile Sync**: Any weight/height entered on the Try-On page will automatically update the user's profile, and vice versa.

## Proposed Changes

### Try-On Page Enhancement

#### [MODIFY] [TryOnPage.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/fitkart-1/src/pages/TryOnPage.tsx)

**Changes**:
1. **Check for Weight/Height**: On page load, check if `user.user_metadata.weight` and `user.user_metadata.height` exist
2. **Show Dialog**: If missing, display a dialog asking for weight (kg) and height (cm) before allowing image upload
3. **Save to Profile**: When user submits, call `updateProfile()` to save the data
4. **Size Recommendation Algorithm**: Create a function that calculates recommended size based on:
   - Weight
   - Height
   - BMI calculation
   - Body type estimation
5. **Fitting Tips**: Generate personalized tips based on measurements

### Size Recommendation Algorithm

Create a new utility file for the algorithm:

#### [NEW] [sizeRecommendation.ts](file:///c:/Users/Aditya%20Kumar%20Singh/fitkart-1/src/lib/sizeRecommendation.ts)

**Algorithm Logic**:
```
1. Calculate BMI = weight(kg) / (height(m))²
2. Determine body frame based on height and weight ratio
3. Map to clothing sizes:
   - XS: BMI < 18.5, height-based adjustments
   - S: BMI 18.5-22, height-based adjustments
   - M: BMI 22-25, height-based adjustments
   - L: BMI 25-28, height-based adjustments
   - XL: BMI 28-32, height-based adjustments
   - XXL: BMI > 32, height-based adjustments
4. Generate fitting tips based on body type
```

**Tips Categories**:
- Fit recommendations (slim fit, regular fit, relaxed fit)
- Length recommendations (regular, tall, petite)
- Style suggestions based on body proportions

### UI Components

#### [NEW] [WeightHeightDialog.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/fitkart-1/src/components/WeightHeightDialog.tsx)

- Dialog component with two input fields (weight, height)
- Validation for reasonable ranges
- Clear explanation of why this data is needed
- Privacy assurance message
- Save button that calls `updateProfile()`

## Verification Plan

### Manual Verification
1. **First-time user flow**:
   - Navigate to `/try-on` as a new user
   - Verify weight/height dialog appears
   - Enter measurements and save
   - Verify profile is updated
   - Verify dialog doesn't appear again

2. **Existing user flow**:
   - Navigate to `/try-on` with weight/height already in profile
   - Verify dialog doesn't appear
   - Verify size recommendations use profile data

3. **Size recommendation accuracy**:
   - Test with various weight/height combinations
   - Verify BMI calculations are correct
   - Verify size recommendations make sense
   - Verify fitting tips are relevant

4. **Profile sync**:
   - Update weight/height in profile page
   - Navigate to try-on page
   - Verify new measurements are used
   - Update on try-on page
   - Check profile page reflects changes
