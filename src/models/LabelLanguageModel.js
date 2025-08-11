// model các nhãn ngôn ngữ của app cung cấp

const LabelLanguageSchema = {
  name: 'LabelLanguage',
  properties: {
    Label_ID: 'int',
    Language_Code: 'string',
    KeyLabel: 'string',
    ValueLabel: 'string',
  },
};

export default LabelLanguageSchema;
