import { render, screen } from "@testing-library/react";
import { useHistory, useLocation } from "react-router-dom";
import { TestIds } from "test/utils/testIds";
import { Advisors } from "./Advisors";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000"
    })
  }));

describe('Advisors', () => { 
    it('it should render Advisors page correctly', () => { 
        render(<Advisors />)
        
    expect(screen.getByTestId(TestIds.Advisor)).toBeInTheDocument()
    expect(screen.getByTestId(TestIds.Filtering)).toBeInTheDocument()
    expect(screen.getByTestId(TestIds.Sorting)).toBeInTheDocument()
    expect(screen.getByText('Filtering')).toBeInTheDocument()
    })
 })