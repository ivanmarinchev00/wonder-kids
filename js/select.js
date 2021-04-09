export default class Select{
    constructor(element){
        this.element = element
        this.options = getFormattedOptions(element.querySelectorAll('option'))
        this.customElement = document.createElement('div')
        this.labelElement = document.createElement('span')
        this.optionsCustomElement = document.createElement('ul')
        setupCustomElement(this)
        element.after(this.customElement)
    }

    get selectedOption(){
        return this.options.find(option => option.selected)
    }
}

function setupCustomElement(select){
    select.customElement.classList.add('custom-select-container')

    select.labelElement.classList.add('custom-select-value')
    select.labelElement.innerText = select.selectedOption.label
    select.customElement.append(select.labelElement)

    select.optionsCustomElement.classList.add('custom-element-options')
    select.options.forEach(option => {
        const optionElement = document.createElement('li')
        optionElement.classList.add('custom-select-option')
        optionElement.classList.toggle('selected', option.selected)
        optionElement.innerText = option.value
        optionElement.dataset.value = option.value
        select.optionsCustomElement.append(optionElement)
    })
    select.customElement.append(select.optionsCustomElement)
}

function getFormattedOptions(options){
   return [...options].map(option => {
        return{
            value: option.value,
            label: option.label,
            selected: option.selected,
            element: option
        }
    })
}