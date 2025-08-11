// model các ngôn ngữ được app hỗ trợ

const LanguageSchema = {
  name: 'Language',
  properties: {
    Language_Code: 'string',
    Language_Title: 'string',
    Language_Avatar: 'string',
  },
};

export default LanguageSchema;
