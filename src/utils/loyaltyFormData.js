export const LOYALTY_TYPES = {
    POINT: 'point',
    PRODUCT: 'product'
};

export const createBaseFormData = () => ({
    id: '',
    loyaltyType: LOYALTY_TYPES.POINT,
    rewardTitle: '',
    rewardDescription: ''
});

export const createPointLoyaltyDetail = () => ({
    spendingAmount: '',
    rewardPoints: '',
    rewardPointsAmount: ''
});

export const createProductLoyaltyDetail = () => ({
    purchaseQuantity: '',
    productId: '',
    rewardQuantity: '',
    rewardProductId: ''
});

export const createBannerSetting = () => ({
    bannerTitle: '',
    titleColor: '#FFFFFF',
    backgroundColor: '#000000',
    backgroundImage: null,
    icon1: null,
    icon2: null,
    icon3: null,
    text1: '',
    text2: '',
    text3: ''
});

export const createPointCustomCard = () => ({
    backgroundColor: '#000000',
    backgroundImg: null,
    backgroundTitle: ''
});

export const createProductCustomCard = () => ({
    backgroundColor: '#000000',
    backgroundImg: null,
    collectedStampImg: null,
    uncollectedStampImg: null
});

export const createPointFormData = () => ({
    ...createBaseFormData(),
    loyaltyType: LOYALTY_TYPES.POINT,
    loyaltyDetail: createPointLoyaltyDetail(),
    bannerSetting: createBannerSetting(),
    customCard: createPointCustomCard()
});

export const createProductFormData = () => ({
    ...createBaseFormData(),
    loyaltyType: LOYALTY_TYPES.PRODUCT,
    loyaltyDetail: createProductLoyaltyDetail(),
    bannerSetting: createBannerSetting(),
    customCard: createProductCustomCard()
});

export const createFormDataByType = (loyaltyType) => {
    switch (loyaltyType) {
        case LOYALTY_TYPES.POINT:
            return createPointFormData();
        case LOYALTY_TYPES.PRODUCT:
            return createProductFormData();
        default:
            return createPointFormData();
    }
};

export const isValidLoyaltyType = (loyaltyType) => {
    return Object.values(LOYALTY_TYPES).includes(loyaltyType);
};

export const getLoyaltyDetailKeys = (loyaltyType) => {
    switch (loyaltyType) {
        case LOYALTY_TYPES.POINT:
            return Object.keys(createPointLoyaltyDetail());
        case LOYALTY_TYPES.PRODUCT:
            return Object.keys(createProductLoyaltyDetail());
        default:
            return [];
    }
};

export const getCustomCardKeys = (loyaltyType) => {
    switch (loyaltyType) {
        case LOYALTY_TYPES.POINT:
            return Object.keys(createPointCustomCard());
        case LOYALTY_TYPES.PRODUCT:
            return Object.keys(createProductCustomCard());
        default:
            return [];
    }
};