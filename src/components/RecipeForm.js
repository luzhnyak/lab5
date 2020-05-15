import Element from './Element';
import Input from './Input';
import { hasMinLength, isURL } from '../helpers/validationHelper';
import { createRecipe } from "../services";
import { messages } from '../helpers/constants';

export default class RecipeForm extends Element {
  constructor() {
    super();
    this.errors = {
      title: '',
      imageUrl: '',
      ingredients: '',
      description: ''
    };

    this.createForm();
  }

  createForm = () => {
    this.element = this.createElement('form');
    this.element.addEventListener('submit', this.onSubmit);

    const formHeader = this.createElement('h4', { classNames: ['mt-3', 'mb-3']});
    formHeader.innerText = 'Create Recipe';
    let inputs = [
      new Input('input', {
        name: 'title',
        placeholder: 'Enter a recipe title',
        id: 'title',
        onBlur: this.validateTitle
      }),
      new Input('input', {
        name: 'imageUrl',
        placeholder: 'Enter a recipe image URL',
        id: 'imageUrl',
        onBlur: this.validateImageUrl
      }),
      new Input('textarea', {
        name: 'ingredients',
        placeholder: 'Enter a recipe ingredients',
        id: 'ingredients',
        onBlur: this.validateIngredients
      }),
      new Input('textarea', {
        name: 'description',
        placeholder: 'Enter a recipe description',
        id: 'description',
        onBlur: this.validateDescription
      }),
    ];

    const labels = [
      this.createLabel('title', 'Title'),
      this.createLabel('imageUrl', 'Image URL'),
      this.createLabel('ingredients', 'Ingredients'),
      this.createLabel('description', 'Description')
    ];

    const submitButton = this.createSubmitButton('Submit');

    const inputContainers = inputs.map((input, idx) => this.wrapTo('form-group', labels[idx], input.element));
    this.element.append(formHeader, ...inputContainers, submitButton);
  };

  createLabel = (forAttr, text) => {
    const label = this.createElement('label', {
      classNames: ['col-sm-2', 'col-form-label'],
      attributes: { for: forAttr }
    });

    label.innerText = text;
    return label;
  };

  createSubmitButton = (text) => {
    const button = this.createElement('button', {
      classNames: ['btn', 'btn-success', 'my-2', 'my-sm-0'],
      attributes: {
        type: 'submit'
      }
    });

    button.innerText = text;
    return button;
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const fields = event.target.elements;
    const fieldArray = Array.from(fields);
    if(this.validateForm(fields)) {
      const submitButton = fieldArray.pop();
      this.setButtonState(submitButton, 'Loading...', true);
      const newRecipeData = Object.fromEntries(fieldArray.map(({ name, value }) => [name, value]));
      await createRecipe(newRecipeData);
      this.setButtonState(submitButton, 'Submit');
      this.resetForm(fieldArray);
      console.log(this.errors);
    }
  };

  setButtonState = (button, text, disabled = false) => {
    button.innerText = text;
    button.disabled = disabled;
  };

  resetForm = (fields) => {
    fields.forEach(field => {
      field.value = '';
      field.classList.remove('is-valid');
      Object.keys(this.errors).forEach(error => this.errors[error] = '');
    });
  };

  validateForm = (fields) => [
    this.validateTitle({ target: fields['title'] }),
    this.validateImageUrl({ target: fields['imageUrl'] }),
    this.validateIngredients({ target: fields['ingredients'] }),
    this.validateDescription({ target: fields['description'] })
  ].every(Boolean);

  setValidationMessage = (field, messageElement, isValid = true) => {
    field.classList.remove(isValid ? 'is-invalid' : 'is-valid');
    field.classList.add(isValid ? 'is-valid' : 'is-invalid');
    messageElement.classList.remove(isValid ? 'invalid-feedback' : 'valid-feedback');
    messageElement.classList.add(isValid ? 'valid-feedback' : 'invalid-feedback');
    messageElement.innerText = isValid ? messages.VALID : this.errors[field.name];
  };

  validateTitle = ({ target }) => {
    const { value } = target;
    if(!hasMinLength(value, 2)) {
      this.errors['title'] = messages.MIN_VALUE;
      this.setValidationMessage(target, target.nextSibling, false);
      return false;
    }
    this.setValidationMessage(target, target.nextSibling);
    return true;
  };

  validateImageUrl = ({ target }) => {
    const { value } = target;
    if(!hasMinLength(value, 2)) {
      this.errors['imageUrl'] = messages.MIN_VALUE;
      this.setValidationMessage(target, target.nextSibling, false);
      return false;
    } else if (!isURL(value)) {
      this.errors['imageUrl'] = messages.INVALID_URL;
      this.setValidationMessage(target, target.nextSibling, false);
      return false;
    }
    this.setValidationMessage(target, target.nextSibling);
    return true;
  };

  validateIngredients = ({ target }) => {
    const { value } = target;
    if(!hasMinLength(value, 2)) {
      this.errors['ingredients'] = messages.MIN_VALUE;
      this.setValidationMessage(target, target.nextSibling, false);
      return false;
    }
    this.setValidationMessage(target, target.nextSibling);
    return true;
  };

  validateDescription = ({ target }) => {
    const { value } = target;
    if(!hasMinLength(value, 2)) {
      this.errors['description'] = messages.MIN_VALUE;
      this.setValidationMessage(target, target.nextSibling, false);
      return false;
    }
    this.setValidationMessage(target, target.nextSibling);
    return true;
  };
}
