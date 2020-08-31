/* 
  code
    0: 正确 / 返回数据
    1：错误
    2：路径错误
    3：格式错误 仅支持jpg或png格式
*/

interface PTBType {
  code: number
  data: any // url, type, width, height
}

interface Base64Type {
  url: string
  type: string
  width?: number
  height?: number
  size?: number
}

const formatType = (str: string) => {
  let type = ''
  switch (str) {
    case 'jpeg':
    case 'jpg':
      type = 'image/jpeg'
      break
    case 'png':
      type = 'image/png'
      break
  }
  if (type !== '') {
    return { code: 0, data: type }
  }
  return { code: 1, data: '' }
}

const isBase64 = (path: string) => {
  // "data:image/jpeg;base64,/..."
  // "data:image/png;base64,/..."
  if (!path) {
    return { code: 2, data: '' }
  }
  const arr = path.split('/')
  if (arr[0] !== "data:image") {
    return { code: 1, data: '' }
  }
  const one = arr[1].split(';')
  return formatType(one[0])
}

const getImageType = (path: string) => {
  if (!path) {
    return { code: 2, data: '' }
  }
  const type = isBase64(path)
  const { code } = type
  if (!code) {
    return type
  }
  const index = path.lastIndexOf(".");
  const ext = path.substr(index + 1);

  const imglist = ['png', 'jpg', 'jpeg'];
  // 进行图片匹配
  const result = imglist.find(item => item === ext);
  if (result) {
    return formatType(result)
  }
  return { code: 3, data: '' }
}

const imgLoad = (path: string) => {
  return new Promise<PTBType>((resolve, reject) => {
    const img = new Image()
    img.setAttribute('crossOrigin', 'anonymous');
    img.onerror = () => reject({ code: 1, data: {} })
    img.onload = () => {
      // 创建canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject({ code: 1, data: {} })
        return
      }
      // GET dataURL
      const width = img.width;
      const height = img.height;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const imgtype = getImageType(path)
      const { code, data } = imgtype
      if (!code) {
        let type = 'image/jpeg'
        type = data
        const dataUrl = canvas.toDataURL(type);
        resolve({ code: 0, data: { url: dataUrl, type, width, height } })
      } else {
        reject(imgtype)
      }
    }
    img.src = path;
  })
}

const pathToBase64 = async (path: string) => {
  if (!path) {
    return { code: 2, data: {} }
  }
  const res = await imgLoad(path)
  return res
}

const base64ToBlob = ({ url, type }: Base64Type) => {
  if (!url || !type) {
    return { code: 2, data: {} }
  }
  const arr = url.split(',');
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const blob = new Blob([u8arr], { type });
  return { code: 0, data: { blob, base64: url } }
}

export const pathToBlobBase64 = async (path: string) => {
  if (!path) {
    return { code: 2, data: '' }
  }
  const pb = await pathToBase64(path)
  const { code: pbCode, data: pbData } = pb
  if (!pbCode) {
    const btb = base64ToBlob(pbData)
    const { code: btbCode, data: btbData } = btb
    if (!btbCode) {
      const { blob } = btbData
      if (blob) {
        const size = blob.size
        const newdata = { ...pbData, size }
        return { code: 0, data: newdata }
      }
    }
    return btb
  }
  return pb


}

export const getInputBase64 = async (file: any) => {
  if (!file) {
    return false
  }
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onloadend = (e: any) => {
      resolve(e.target.result);
    };
    fileReader.onerror = () => {
      reject(false);
    };
    fileReader.readAsDataURL(file);
  });
}