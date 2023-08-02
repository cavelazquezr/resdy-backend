type ColorPalette = {
  backgroundColor1: string;
  backgroundColor2: string;
  fontColor1: string;
  fontColor2: string;
  detailColor1: string;
  detailColor2: string;
};

type FontFamiliesRecord = {
  font1: string;
  font2: string;
};

export interface CustomizationRecord {
  colorPalette: ColorPalette;
  fontFamily: FontFamiliesRecord;
  brand_name: string;
  logo: string;
}
