export default interface IWebHookDTO {
  channel: string;
  type: string;
  status: string;
  to: string;
  from: string;
  creationDate: string;
  sendDate: string;
  readDate: string;
  receivedDate: string;
  content: string;
  idMessage: string;
  base64: string;
  fileName: string;
  contactUser: {
    number: string;
    name: string;
    profileImageUrl: string;
  };
  urlFile: string;
}
