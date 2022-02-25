import { extend, setInteractionMode } from 'vee-validate'
import { required, email, max, min, alpha_spaces, digits } from 'vee-validate/dist/rules'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
})

extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters'
})

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits. ({_value_})'
})

extend('email', email)

extend('alpha_spaces', alpha_spaces)
