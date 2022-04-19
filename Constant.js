export const regexName = /^[a-zA-Z 0-9]+$/i;

export const regexNumber = /^[0-9]{10}/g;

export const regexemail = /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g;
export const regexpassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; //password between 6 to 20 which contain at least one numeric digit,one uppercase and one lowercase letter
export const regexnumber = /^[0-9]{10}/g;

export const LocalApiUrl = "http://192.168.1.8:5000";
