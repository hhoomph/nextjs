// Convert Form Array To json
export const objectifyForm = formArray => {
  //serialize data function
  let returnArray = {};
  for (var i = 0; i < formArray.length; i++) {
    returnArray[formArray[i]['name']] = formArray[i]['value'];
  }
  return returnArray;
};
//  Check string is json or not
export const isJSON = str => {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
};
//  Add comma Separator to digit number
export const numberSeparator = (num, sep) => {
  let number = typeof num === 'number' ? num.toString() : num,
    separator = typeof sep === 'undefined' ? ',' : sep;
  return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separator);
};
//  Remove comma seprator From digit number
export const removeSeparator = (num, sep) => {
  let separator = typeof sep === 'undefined' ? ',' : sep;
  var re = new RegExp(separator, 'g');
  return num.replace(re, '');
};
//  Convert elemetn's value for remove all characters exept number, Just Allow Type Numbers
export const forceNumeric = e => {
  let $input = e.target.current;
  $input.val($input.val().replace(/[^\d]+/g, ''));
};
//  Convert Persian & Arabic number to English
const persianNumbersExp = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
const arabicNumbersExp = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
const englishNumbersExp = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];
const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
export const fixNumbers = str => {
  str = str.toString();
  if (typeof str === 'string') {
    for (let i = 0; i < 10; i++) {
      str = str.replace(persianNumbersExp[i], i).replace(arabicNumbersExp[i], i);
    }
  }
  return str;
};
//  Convert  English number to Persian
export const convertNumber = str => {
  str = str.toString();
  if (typeof str === 'string') {
    for (let i = 0; i < 10; i++) {
      str = str.replace(englishNumbersExp[i], persianNumbers[i]);
    }
  }
  return str;
};
//  Check if value Start (^) with a Persian word
export const checkPersianWord = string => {
  if (!/^[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s\n\r\t\d\(\)\[\]\{\}.,،;\-؛]+$/.test(string)) {
    //console.log('با کلمه فارسی شروع نشده');
  } else {
    //console.log('با کلمه فارسی شروع شده');
  }
};
//  Dont Allow Specials Charachters and numbers to type and replace them with remove, Work Fine
export const forceLetter = e => {
  let $input = e.target.current;
  $input.val($input.val().replace(/\d/g, ''));
  $input.val($input.val().replace(/[&\/\\#,@@|+=!-_()$~%.'":*؟،×÷?<>{}]/g, ''));
  //$input.val($input.val().replace(/\s/g,''));       // space
};
// Convert Second to M:S
export const secondsToMs = d => {
  d = Number(d);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);
  var mDisplay = m > 0 ? m + ':' : '00:';
  var sDisplay = s > 0 ? s : '00';
  return mDisplay + sDisplay;
};
export default numberSeparator;