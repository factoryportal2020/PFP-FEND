const empty = (v: string) => {
  if (v == null || v == "undefined") {
    return true;
  }
  return v.toString().replace(/\s/g, '').length ? false : true
};
const email = (v: string) => (reg(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, v));
const indianPhoneNo = (v: string) => (reg(/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/, v));
const number = (v: number, min: any, max: any) => {
  if (min === null && max === null) {
    return true
  }
  if (!isNumeric(v)) {
    return false;
  }
  return v < min || v > max ? false : true;
};
// TODO: find a better type for regex
const reg = (reg: any, v: string) => {
  let err = true;
  if (reg.test(v)) {
    err = false;
  }
  return err;
};
const isNumeric = (v: any) => {
  return !isNaN(parseFloat(v)) && isFinite(v);
};

const requiredArray = (v: any) => {
  return (v.length != 0) ? false : true;
};

const isFiles = (v: any, rule: string) => {
  if (requiredArray(v)) {
    return [{ result: true }, { value: [] }];
  }
  const result: boolean[] = [];
  const onlyimages: object[] = [];

  var allowedExtensions = /(\.txt)$/i;
  if (rule == "pdf") {
    allowedExtensions = /(\.pdf)$/i;
  } else if (rule == "doc") {
    allowedExtensions = /(\.doc|\.docx)$/i;
  } else if (rule == "excel") {
    allowedExtensions = /(\.xlsx|\.xls)$/i;
  } else if (rule == "csv") {
    allowedExtensions = /(\.csv)$/i;
  } else if (rule == "image") {
    allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  }
  var rw = v.map((val: any) => {
    let chk = (allowedExtensions.exec(val.file.name) != null) ? true : false;
    val.file.is_image = chk;
    if (chk) {
      result.push(chk);
      onlyimages.push(val);
    }
  });
  return [{ result: result.indexOf(false) !== -1 }, { value: onlyimages }]
};


const toCapitalize = (v: string) => {
  return v.charAt(0).toUpperCase() + v.slice(1);
};

const hasErrorNaming = (v: string, v1: string) => {
  let str = "has" + toCapitalize(v) + toCapitalize(v1)
  return str;
  // return str.replace("_", "");
}

interface Validator {
  [key: string]: Function;
}

const validator: Validator = {
  reg,
  empty,
  email,
  number,
  toCapitalize,
  hasErrorNaming,
  indianPhoneNo,
  requiredArray,
  isFiles
};
export default validator;