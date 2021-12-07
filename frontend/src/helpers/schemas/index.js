import Ajv from "ajv"
const ajv = new Ajv({ allErrors: true, verbose: true })

export default ajv
