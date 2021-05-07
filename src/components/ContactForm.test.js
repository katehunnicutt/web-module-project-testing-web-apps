import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)

    const header = screen.queryByText(/contact form/i)

    expect(header).toBeInTheDocument()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)

    const firstName = screen.getByLabelText( "First Name*" )
    const lastName = screen.getByLabelText( "Last Name*" )
    const email  = screen.getByLabelText( "Email*" )

    userEvent.type(firstName, "kait")
    userEvent.type(lastName, "hunni")
    userEvent.type(email, "hunni@gmail.com")

    const errors = await screen.findAllByText(/error/i)

    expect(errors.length).toEqual(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />)

  const button = screen.getByTestId("submitButton")

  userEvent.click(button)

  const errors = await screen.findAllByText(/error/i)
  expect(errors.length).toEqual(3)
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    
    const firstName = screen.getByLabelText( "First Name*" )
    const lastName = screen.getByLabelText( "Last Name*" )
    const button = screen.getByTestId("submitButton")
    
    userEvent.type(firstName, "Emily")
    userEvent.type(lastName, "Hunni")
    userEvent.click(button)

    const errors = await screen.findAllByText(/error/i)

    expect(errors.length).toEqual(1)
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render (<ContactForm />)

  const email = screen.getByLabelText( "Email*" )

  userEvent.type(email, "yayayay")
  
  const errors = await screen.findAllByText(/error/i)
  expect(errors.length).toEqual(1)
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render (<ContactForm />)

    const firstName = screen.getByLabelText("First Name*")
    const email = screen.getByLabelText("Email*")
    const button = screen.getByTestId( "submitButton" )

    userEvent.type(firstName, "Emily")
    userEvent.type(email, "emily@gmail.com")
    userEvent.click(button)

    const errors = await screen.findAllByText(/error/i)
    expect(errors.length).toEqual(1)
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm />)

  const firstName = screen.getByLabelText("First Name*")
  const lastName = screen.getByLabelText("Last Name*")
  const email = screen.getByLabelText("Email*")
  const button = screen.getByTestId( "submitButton" )
    
  userEvent.type(firstName, "Emily")
  userEvent.type(lastName, "hunni")
  userEvent.type(email, "em@gmail.com")
  userEvent.click(button)

  const submitFirst = await screen.findByText(/Emily/i)
  const submitLast = await screen.findByText(/hunni/i)
  const submitEmail = await screen.findByText(/em@gmail.com/i)

  expect(submitFirst).toBeVisible()
  expect(submitLast).toBeVisible()
  expect(submitEmail).toBeVisible()


});

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm />)

  const firstName = screen.getByLabelText("First Name*")
  const lastName = screen.getByLabelText("Last Name*")
  const email = screen.getByLabelText("Email*")
  const message = screen.getByLabelText("Message")
  const button = screen.getByTestId( "submitButton" )
    
  userEvent.type(firstName, "Emily")
  userEvent.type(lastName, "hunni")
  userEvent.type(email, "em@gmail.com")
  userEvent.type(message, "Im done thanks")
  userEvent.click(button)

  const submitFirst = await screen.findByText(/Emily/i)
  const submitLast = await screen.findByText(/hunni/i)
  const submitEmail = await screen.findByText(/em@gmail.com/i)
  const submitMessage = await screen.findByDisplayValue(/Im done thanks/i)

  expect(submitFirst).toBeVisible()
  expect(submitLast).toBeVisible()
  expect(submitEmail).toBeVisible()
  expect(submitMessage).toBeVisible()

    
});