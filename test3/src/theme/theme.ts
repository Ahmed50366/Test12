import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface Spacing {
    space_2: number;
    space_4: number;
    space_8: number;
    space_10: number;
    space_12: number;
    space_15: number;
    space_16: number;
    space_18: number;
    space_20: number;
    space_24: number;
    space_28: number;
    space_30: number;
    space_32: number;
    space_36: number;
  }
  
  export const SPACING: Spacing = {
    space_2: wp('2%'),
    space_4: wp('3%'),
    space_8: wp('4%'),
    space_10: wp('5%'),
    space_12: wp('6%'),
    space_15: wp('7%'),
    space_16: wp('8%'),
    space_18: wp('9%'),
    space_20: wp('10%'),
    space_24: wp('11%'),
    space_28: wp('12%'),
    space_30: wp('13%'),
    space_32: wp('14%'),
    space_36: wp('15%'),
  };
  
  interface Color {
    primaryRedHex: string;
    primaryOrangeHex: string;
    primaryBlackHex: string;
    primaryDarkGreyHex: string;
    secondaryDarkGreyHex: string;
    primaryGreyHex: string;
    secondaryGreyHex: string;
    primaryLightGreyHex: string;
    secondaryLightGreyHex: string;
    primaryWhiteHex: string;
    primaryBlackRGBA: string;
    secondaryBlackRGBA: string;
  }
  
  export const COLORS: Color = {
    primaryRedHex: '#DC3535',
    primaryOrangeHex: '#D17842',
    primaryBlackHex: '#0C0F14',
    primaryDarkGreyHex: '#141921',
    secondaryDarkGreyHex: '#21262E',
    primaryGreyHex: '#252A32',
    secondaryGreyHex: '#252A32',
    primaryLightGreyHex: '#52555A',
    secondaryLightGreyHex: '#AEAEAE',
    primaryWhiteHex: '#FFFFFF',
    primaryBlackRGBA: 'rgba(12,15,20,0.5)',
    secondaryBlackRGBA: 'rgba(0,0,0,0.7)',
  };
  
  interface FontFamily {
    poppins_black: string;
    poppins_bold: string;
    poppins_extrabold: string;
    poppins_extralight: string;
    poppins_light: string;
    poppins_medium: string;
    poppins_regular: string;
    poppins_semibold: string;
    poppins_thin: string;
  }
  
  export const FONTFAMILY: FontFamily = {
    poppins_black: 'Poppins-Black',
    poppins_bold: 'Poppins-Bold',
    poppins_extrabold: 'Poppins-ExtraBold',
    poppins_extralight: 'Poppins-ExtraLight',
    poppins_light: 'Poppins-Light',
    poppins_medium: 'Poppins-Medium',
    poppins_regular: 'Poppins-Regular',
    poppins_semibold: 'Poppins-SemiBold',
    poppins_thin: 'Poppins-Thin',
  };
  
  interface FontSize {
    size_8: number;
    size_10: number;
    size_12: number;
    size_14: number;
    size_16: number;
    size_18: number;
    size_20: number;
    size_24: number;
    size_28: number;
    size_30: number;
  }
  
  export const FONTSIZE: FontSize = {
    
    size_8: wp('2%'),
    size_10: wp('2.5%'),
    size_12: wp('3%'),
    size_14: wp('3.5%'),
    size_16: wp('4%'),
    size_18: wp('4.5%'),
    size_20: wp('5%'),
    size_24: wp('5.5%'),
    size_28: wp('6%'),
    size_30: wp('7%'),
  };
  
  interface BorderRadius {
    radius_4: number;
    radius_8: number;
    radius_10: number;
    radius_15: number;
    radius_20: number;
    radius_25: number;
  }
  
  export const BORDERRADIUS: BorderRadius = {
    radius_4: wp('1%'),
    radius_8: wp('2%'),
    radius_10: wp('3%'),
    radius_15: wp('4%'),
    radius_20: wp('5%'),
    radius_25: wp('6%'),
  };