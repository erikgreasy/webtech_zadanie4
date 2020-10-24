
/**
 * Selecting elements
 */
const form = document.querySelector('#bestFormEver')
const modal = document.querySelector('#bestModal')
const closeModalBtn = document.querySelector('#bestModal .close')
const x_input = form.querySelector( 'input[name="value_x"]' )
const y_input = form.querySelector( 'input[name="value_y"]' )

let table = document.createElement('table')
table.classList.add( 'table' )



/**
 * Event listeners
 */

form.addEventListener('submit', function(e) {
    e.preventDefault()

    clearTable( table )
    
    
    if( ! validateForm( [x_input, y_input] ) ) {
        console.log('no')
    } else {
        
        // Get out of inpus focus on submit to prevent unwanted typing when modal is open
        document.activeElement.blur();

        fillTable( table, x_input.value, y_input.value )

        modal.querySelector('.modal-body').appendChild( table )
        modal.style.display = 'block'
    }
    
})


// Close modal event listeners

document.addEventListener( 'keydown', event => {
    if( event.key === "Escape" ) {
        closeModal( modal )
    }
} )
closeModalBtn.addEventListener('click', () => {
    closeModal( modal )  
})



/**
 * Hide modal and clear table
 */
function closeModal( modal ) {
    let table = modal.querySelector('table')
    modal.style.display = "none"
    modal.querySelector('.modal-body').removeChild( table )
    clearTable(table)
}


/**
 * Fills table with x rows and y columns
 */
function fillTable(table, x, y) {

    let row = document.createElement('tr')
    let th = document.createElement('th')
    row.appendChild( th )

    for( let i = 1; i <= y; i++ ) {
        let th = document.createElement('th')
        th.appendChild( document.createTextNode( `Y=${ i }` ) )
        row.appendChild( th )

    }
    table.appendChild(row)


    for( let i = 1; i <= x; i++ ) {
        let row = document.createElement('tr')
        let th = document.createElement('th')
        th.appendChild( document.createTextNode( `X=${ i }` ) )
        row.appendChild( th )

        for( let j = 1; j <= y; j++ ) {
            let column = document.createElement('td')
            column.appendChild( document.createTextNode( i * j ) );
            row.appendChild( column )
        }
        table.appendChild(row)

    }
}


/**
 * Makes input invalid
 */
function makeInvalid( input ) {
    input.classList.remove( 'is-valid' )
    input.classList.add( 'is-invalid' )
}


/**
 * Makes input valid
 */
function makeValid( input ) {
    input.classList.remove( 'is-invalid' )
    input.classList.add( 'is-valid' )
}


/**
 * Validates all inputs and returns the boolean
 */
function validateForm( inputs ) {
    let valid = true

    inputs.forEach( input => {
        if( ! isInputValid(input) ) {
            valid = false
        }
    } )

    return valid
}


/**
 * Returns true or false based on our specific input validation
 */
function isInputValid( input ) {
    let value = input.value

    if( value.trim() == '' ) {
        makeInvalid( input )
        return false
    } else if( !value.match('[1-9]')) {
        makeInvalid( input )
        return false
    } else if( value > 9 || value < 1 ) {
        makeInvalid( input )
        return false    
    }

    makeValid( input )
    return true
}


/**
 * Handles clearing table element from trs, tds, ths
 */
function clearTable( table ) {
    removeRows( table)
}


/**
 * Removes and cleares all tr elements from table element
 */
function removeRows( table ) {
    let trs = Array.from( table.querySelectorAll( 'tr' ) )
    trs.forEach(element => {
        removeColumns( element )
        table.removeChild( element )
    });
}


/**
 * Removes all th and td elements from row element
 */
function removeColumns( row ) {
    let ths = Array.from( row.querySelectorAll('th') )
    let tds = Array.from( row.querySelectorAll('td') )
    tds.forEach(element => {
        row.removeChild(element)
    });
    ths.forEach(element => {
        row.removeChild(element)
    });
}

