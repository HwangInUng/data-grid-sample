export const pattern = {
  number: '^[0-9]+$',
  id: '^[A-Za-z0-9]{4,10}$', // 4~10자리 숫자 + 대소문자
  basicPassword: '^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$', // 숫자 + 영문
  // 특문 + 숫자 + 영문
  symbolPassword: '^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$',
  phone: '^d{3}-d{3,4}-d{4}$', // 핸드폰
  call: 'd{2,3}-d{3,4}-d{4}/g', // 유선, 핸드폰 모두
  email: '[w-.]+@[w-.]+/g',
  symbol: '[]{}/().?<>!@#$%^&*/g',
};