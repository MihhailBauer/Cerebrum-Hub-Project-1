beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

//BONUS TASK: add visual tests for registration form 3


describe('This is functional tests for registration form 3, Mihhail Bauer', () => {
    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

    })

    it('Check if dropdown is correct', () => {
        cy.get('#country').select(1).screenshot('Contry drop-down')
        cy.screenshot('Full page screenshot')

        // Checking length of array of elements in Countries dropdown
        //cy.get('#country').children().should('have.length', 4)
        cy.get('#country').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has empty text
        cy.get('#country').find('option').eq(0).should('have.text', '')
        //Check  that second element in the dropdown has text Spain
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        //Check  that third element in the dropdown has text Estonia
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        //Check  that fourth element in the dropdown has text Austria
        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
        
        // Advanced level
        cy.get('#country').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'object:3', 'object:4', 'object:5'])
        })
        // When country is changed, cities drop-down must also update with the list of cities in that country
        // Checking cities in the specific country(Spain)
        cy.get('#country').select('Spain')
        cy.screenshot('Full page screenshot')
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')

        // Checking cities in the specific country(Estonia)
        cy.get('#country').select('Estonia')
        cy.screenshot('Full page screenshot')
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
        cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')

        // Checking cities in the specific country(Austria)
        cy.get('#country').select('Austria')
        cy.screenshot('Full page screenshot')
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
        cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
        cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')
            
    })

    it('Check that check boxes working', () => {
        // Array of found elements with given selector has 3 elements in total and unchecked
        cy.get('input[type="checkbox"]').should('have.length', 2).should('not.be.checked')
        // Mark the first checkbox as checked and assert its state
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        // Mark the second checkbox as checked and assert the state of the first and second checkboxes (both will stay checked)
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        // Check link and its content
        cy.get('button').should('have.text', 'Accept our cookie policy')
        cy.get('button').children().should('be.visible').and('have.attr', 'href', 'cookiePolicy.html').click()
        // Check that currently opened URL is correct
        cy.url().should('contain', '/cookiePolicy.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 3')

    })

    it('Check email format', () => {
        cy.get('input[type="email"]').type('invalid')
        cy.get('[ng-show="myForm.email.$error.email"]').should('be.visible').should('contain', 'Invalid email address.')
        cy.get('input[type="email"]').clear().type(' ')
        cy.get('[ng-show="myForm.email.$error.required"]').should('be.visible').should('contain', 'Email is required.')

    })
    
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img[data-testid="picture"]').should('have.attr', 'src').should('include', 'cerebrum_hub_logo.png')
        // get element and check its parameter height, to less than 178 and greater than 100
        cy.get('img[data-testid="picture"]').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   

    })



//BONUS TASK: add functional tests for registration form 3

    // All fields are filled in + validation
    it('User filled all fields', () => {
        cy.get('#name').clear().type('Mihhail')
        cy.get('[name="email"]').type('test@email.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('[type="date"]').first().click().type('1970-01-01')
        cy.get('input[type="radio"]').eq(3).check().should('be.checked')
        cy.get('#birthday').click().type('1970-01-01')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="submit"]').last().should('be.visible')

    })

    // Only mandatory fields are filled in + validations
    it('User can submit data only when valid mandatory values are added', () => {
        cy.get('[name="email"]').type('test@email.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="submit"]').last().should('be.visible')
        cy.get('[ng-disabled="myForm.$invalid"]').should('not.have.attr', 'disabled')

    })

    // Mandatory fields are absent + validations
    it('User have not filled mandatory fields', () => {
        cy.get('#name').clear().type('Mihhail')
        cy.get('[type="date"]').first().click().type('1970-01-01')
        cy.get('input[type="radio"]').eq(3).check().should('be.checked')
        cy.get('#birthday').click().type('1970-01-01')
        cy.get('[ng-disabled="myForm.$invalid"]').should('have.attr', 'disabled')

    })

    // If city is already chosen and country is updated, then city choice should be removed
    it('If city is already chosen and country is updated, then city choice should be removed', () => {
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('#country').select('Austria')
        cy.get('#city').should('not.be.selected')

    })

    // Add file
    it('User can attach file and submit data', () => {
        cy.get('#myFile').selectFile('load_this_file_reg_form_3.txt')
        cy.get('input[type="submit"]').first().click()
        cy.go('back')
        cy.log('Back again in registration form 3')
       
    })

    


})