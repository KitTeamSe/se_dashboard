export const accountData = [
  { key: 'accountId', name: 'PK' },
  { key: 'idString', name: 'ID' },
  { key: 'name', name: '이름' },
  { key: 'nickname', name: '닉네임' },
  { key: 'email', name: '이메일' },
  { key: 'type', name: '타입' },
  { key: 'phoneNumber', name: '전화번호' },
  { key: 'studentId', name: '학번' },
  { key: 'informationOpenAgree', name: '정보공유동의' },
  { key: 'lastSignInIp', name: '최근접속IP' }
];

export const informationOpenAgreeEnum = {
  AGREE: '🟢',
  DISAGREE: '🔴'
};

export const typeEnum = {
  STUDENT: '학생',
  PROFESSOR: '교수',
  ASSISTANT: '조교',
  OUTSIDER: '외부인',
  ANONYMOUS: '익명'
};
