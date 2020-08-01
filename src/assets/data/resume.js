export const resume = {
  address: '',
  age: '',
  education: [''],
  email: '@qq.com',
  experience: '',
  name: '',
  phone: '',
  work: ['']
}

export const companyLists = [
  {
    cid: '',
    company: '',
    logo: '',
    project: [
      {
        name: '',
        pid: '',
      },
    ]
  }
]

export const workExperience = [
  {
    cid: '',
    describe: [''],
    label: [''],
    logo: '',
    name: '',
    time: [],
    work:''
  },
]

export const randomString = (len) => {
  len = len || 8;
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  const maxPos = chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}


