import Parse from 'html-react-parser';

const parseGraphData = (data: string, makeName = '', modelName = '') => {
  let result = data;

  if (makeName.length || modelName.length) {
    result = result
      .replace(/\[make\]/g, makeName)
      .replace(/\[MAKE\]/g, makeName)
      .replace(/\[model\]/g, modelName)
      .replace(/\[MODEL\]/g, modelName);
  }

  return Parse(result);
};

export default parseGraphData;
