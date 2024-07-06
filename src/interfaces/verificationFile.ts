import { DOCUMENT_TYPE } from '../utils/constance';

export interface verificationFile {
  documentType: DOCUMENT_TYPE;
  name: string;
  path: string;
  _id: string;
}
