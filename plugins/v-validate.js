import Vue from "vue"
import VeeValidate, { Validator } from "vee-validate"

import CpfValidator from "./components/validators/cpf"
import Dictionary from "./components/validators/dictionary"

Validator.extend("cpf", CpfValidator)

Vue.use(VeeValidate, { locale: "pt", dictionary: Dictionary })
