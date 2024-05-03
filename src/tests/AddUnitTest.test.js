// AddUser.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddUser from "../components/AddUser"; // Assuming your AddUser component is in a file named AddUser.js
import axios from "axios";

describe("AddUser component", () => {
  jest.spyOn(window, "alert").mockImplementation();
  
  it("should render the component with form and labels", () => {
    const { getByText, getByPlaceholderText } = render(<AddUser />);

    expect(getByText("Ajouter un utilisateur:")).toBeInTheDocument();
    expect(getByPlaceholderText("Username")).toBeInTheDocument();
    expect(getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("should update state on input change", () => {
    const { getByPlaceholderText } = render(<AddUser />);

    const usernameInput = getByPlaceholderText("Username");
    const emailInput = getByPlaceholderText("Email");

    fireEvent.change(usernameInput, { target: { value: "johndoe" } });
    fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });

    expect(usernameInput.value).toBe("johndoe");
    expect(emailInput.value).toBe("johndoe@example.com");
  });

  it("should show alert for empty fields on submit", () => {
    jest.spyOn(window, "alert"); // Mock the alert function

    const { getByTestId } = render(<AddUser />);
    const submitButton = getByTestId("send"); // Assuming you added data-testid="send" to the submit button

    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith(
      "Veuillez remplir tous les champs"
    );
  });

  it("should show alert for field email not an email", () => {
    jest.spyOn(window, "alert"); // Mock the alert function

    const { getByTestId, getByPlaceholderText } = render(<AddUser />);
    const submitButton = getByTestId("send"); // Assuming you added data-testid="send" to the submit button
    const usernameInput = getByPlaceholderText("Username");
    const emailInput = getByPlaceholderText("Email");

    fireEvent.change(usernameInput, { target: { value: "johndoe" } });
    fireEvent.change(emailInput, { target: { value: "johndoeexample.com" } });
    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith(
      "Veuillez renseigner une adresse e-mail valide"
    );
  });

  // This test requires mocking the axios call
  it("should call axios.post on submit with valid data", async () => {
    const mockAxios = jest.spyOn(axios, "post"); // Mock axios.post

    const { getByPlaceholderText, getByTestId } = render(<AddUser />);
    const submitButton = getByTestId("send");

    const usernameInput = getByPlaceholderText("Username");
    const emailInput = getByPlaceholderText("Email");

    fireEvent.change(usernameInput, { target: { value: "johndoe" } });
    fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });

    await fireEvent.click(submitButton);

    expect(mockAxios).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}api/users`,
      { username: "johndoe", email: "johndoe@example.com" }
    );
  });
});
