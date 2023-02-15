/** A generic file.
 * Can be used to fetch any data for autocomplete with the requirement of
 * following functions as arguments.
 * 
 * root : Element to which the api data is to be rendered on.
 * fetchData : Fetch data from API based on the input search terms.
 * renderOption : Takes in an item as an argument and returns the formatted
 * version to display in the autocomplete menu.
 * onOptionSelect : Actions to take on selecting an item.
 * inputValue : Value of Input after selecting an item from the list
 */

const createAutoComplete = ({
    root, 
    fetchData, 
    renderOption, 
    onOptionSelect, 
    inputValue
}) => {
    root.innerHTML = `
    <div class="dropdown">
        <label><b>Search </b></label>
        <input class="input" />
        <div class="dropdown"></div>
            <div class="dropdown-menu">
                <div class="dropdown-content results">
                </div>
            </div>
        </div>
    </div>
    `
    // Select the input element from DOM
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    const onInput = async (event) => {
        // Fetch data array from api based on input term
        const items = await fetchData(event.target.value)
        
        // If no results... close the dropdown
        if(!items.length) {
            dropdown.classList.remove('is-active')
            return;
        }

        // Clear the results before showing the updated ones!
        resultsWrapper.innerHTML = "";

        // Adding is-active makes the dropdown to display block instead of none.
        dropdown.classList.add('is-active')
        
        for (let item of items) {
            const option = document.createElement('a');
            
            option.classList.add('dropdown-item')
            // Add data to the options
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active')
                input.value = inputValue(item);
                onOptionSelect(item)
            })
            // Append every movies recieved
            resultsWrapper.appendChild(option)
        }
    }

    input.addEventListener('input',debounce(onInput, 2000))

    document.addEventListener('click', event => {
        // (event.target) returns the element that was clicked on..
        // If the element that was clicked on is not within the root i.e. the dropdown
        // then close the dropdown

        if(!root.contains(event.target))
            dropdown.classList.remove('is-active')
    })
}