export interface FormField {
  type: 'text' | 'number' | 'date' | 'email' | 'select' | 'textarea' | string;
  label: string;
  name: string;
  options?: string[];
  placeholder?: string;
  value?: any;
  validators?: any[];
}

export interface FormSection {
  personalDatas: FormField[];
  personalAddresses: FormField[];
}
