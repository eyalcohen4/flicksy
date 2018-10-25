/**
 * @function requiredParam
 *  This function will called and throw an error in cases
 *  where we pass an undefined paramter to a function
 */
const requiredParam = (param) => {
  throw new Error(
    `Required parameter, "${param}" is missing.`
  );
};


export default requiredParam;
