/* eslint-disable @typescript-eslint/no-explicit-any */
export function onlyDecimalNumber(event: any, ...ignore: any) {
  const ASCIICode = event.which ? event.which : event.keyCode;
  const key = event.key;

  // ASCIICode = 44 for , (koma)

  // jika comma lebih dari satu
  if (ASCIICode == 44 && event.target.value.includes(',')) {
    event.preventDefault();
  }

  if (ASCIICode > 31 && ASCIICode != 44 && (ASCIICode < 48 || ASCIICode > 57)) {
    if (!ignore.includes(key)) {
      event.preventDefault();
    }
  }
  return true;
}
export function formattingThousand(value: number | string) {
  if (value) {
    const parts = value.toString().split('.');
    if (parts.length > 1) {
      // jika ada price yang decimal (misal: 125.000,12)
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return parts.join(',');
    } else {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }
  return value;
}
export function onlyAlphanumeric(value: string) {
  const alphanumericRegex = /^[a-zA-Z0-9 ]+$/;

  return alphanumericRegex.test(value);
}
export function getCookie(cname: string) {
  const name = cname + '=';
  if (typeof window !== 'undefined') {
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
}
export function getCurrentLocation(options: {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      ({ code, message }) =>
        reject(
          Object.assign(new Error(message), { name: 'PositionError', code })
        ),
      options
    );
  });
}
