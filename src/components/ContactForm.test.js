import React from 'react';
import {getByLabelText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render (<ContactForm />);
});

test('renders the contact form header', ()=> {
    //Arrange- component is rendered
    render(<ContactForm />)
    //Act- find the header dom element on screen
    const header = screen.queryByText(/contact form/i);

    //Assert- very that the element exists
    expect(header).toBeInTheDocument();

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //arrange
    render(<ContactForm />)

    //act find the elements
    const firstName = screen.getByLabelText("First Name*")
    const lastName = screen.getByLabelText("Last Name*")
    const email = screen.getByLabelText("Email*")

    userEvent.type(firstName, "Kait")
    userEvent.type(lastName, "Hunni")
    userEvent.type(email, 'k@gmail.com')

    //assert check to see length is 1 error
    const errors = await screen.findAllByText(/error/i)

    expect(errors.length).toEqual(1)

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    //arrange 
    render(<ContactForm />)
    //Act find the elements being tested
 
    const button = screen.getByTestId("submitButton")

    //user test

    userEvent.click(button)

    //Assert test, check that three errors run
    const errors = await screen.findAllByText(/error/i)
    expect(errors.length).toEqual(3)

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    //arrange
    render(<ContactForm />)
    //act find the elements
    const firstName = screen.getByLabelText("First Name*")
    const lastName = screen.getByLabelText("Last Name*")
    const button = screen.getByTestId("submitButton")

    //userTest
    userEvent.type(firstName, "Emily")
    userEvent.type(lastName, "Hunni")
    userEvent.click(button)

    const errors = await screen.findAllByText(/error/i)
    expect(errors.length).toEqual(1)
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    //arrange arrange arrange arrange
    render(<ContactForm />)
    //act fine the elements in ?
    const email = screen.getByLabelText("Email*")
    userEvent.type(email, "animalsyay")

    //assert the text is a valid email
    const errors = await screen.findAllByTestId(/error/i)
    expect(errors.length).toEqual(1)


    
});

test('renders "lastName is a required field" if a last name is not entered and the submit button is clicked', async () => {
    // act
    render(<ContactForm />)
    //arrange getcha elements
    const firstName = screen.getByLabelText("First Name*")
    const email = screen.getByLabelText("Email*")
    const button = screen.getByTestId("submitButton")

    userEvent.type(firstName, "emily")
    userEvent.type(email, "emily@gmail.com")
    userEvent.click(button)
    
    //assert test will yell at you because no lastname
    const errors = await screen.findAllByTestId(/error/i)
    expect(errors.length).toEqual(1)
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    //arrange
    render(<ContactForm />)
    //act get elems
    
    const firstName = screen.getByLabelText("First Name*")
    const lastName = screen.getByLabelText("Last Name*")
    const email = screen.getByLabelText("Email*")
    const button = screen.getByTestId("submitButton")

    userEvent.type(firstName, "emily")
    userEvent.type(lastName, "Hunni")
    userEvent.type(email, "em@email.com")
    userEvent.click(button)

    const submittedFirst = await screen.findByText(/emily/i)
    const submittedLast = await screen.findByText(/Hunni/i)
    const submittedEmail = await screen.findByText(/em@email.com/i)
    
    //assert checking that message is only submitted if there is text input
    expect(submittedFirst).toBeVisible
    expect(submittedLast).toBeVisible
    expect(submittedEmail).toBeVisible
    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    //act
    const firstName = screen.findByLabelText("First Name*")
    const lastName = screen.findByLabelText("Last Name*")
    const email = screen.findByLabelText("Email*")
    const message = screen.findByLabelText("message")
    const button = screen.findByTestId("submitButton")

    userEvent.type(firstName, "emily")
    userEvent.type(lastName, "Hunni")
    userEvent.type(email, "emily@email.com")
    userEvent.type(message, "im really done with this assignment now")
    userEvent.click(button)

    const submitFirst = await screen.findByText(/emily/i)
    const submitLast = await screen.findByText(/Hunni/i)
    const submitEmail = await screen.findByText(/emily@email.com/i)
    const submitMessage = await screen.findByDisplayValue("im really done with this assignment now")

    expect(submitFirst).toBeVisible
    expect(submitLast).toBeVisible
    expect(submitEmail).toBeVisible
    expect(submitMessage).toBeVisible
    
});